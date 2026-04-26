import { showDocs } from "./docs.js";
import { createPet, getPet, listPets } from "./pets.js";
import { createRequest, deleteRequest, listRequests } from "./requests.js";
import { CORS_HEADERS } from "./http.js";

const routes = [
  route("GET", "/pets", listPets),
  route("GET", "/pets/:id", getPet),
  route("POST", "/pets", createPet),

  route("GET", "/requests", listRequests),
  route("POST", "/requests", createRequest),
  route("DELETE", "/requests/:id", deleteRequest),

  route("GET", "/", showDocs),
  route("GET", "/docs", showDocs),
];

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "");

    for (const route of routes) {
      const params = route.match(request.method, path);
      if (!params) continue;

      return route.handler({ request, env, params });
    }

    return json({ error: "Not found" }, 404);
  },
};

function route(method, pattern, handler) {
  const patternParts = pattern.split("/").filter(Boolean);

  return {
    handler,
    match(requestMethod, path) {
      if (requestMethod !== method) return null;
      if (pattern === "/" && path === "") return {};

      const pathParts = path.split("/").filter(Boolean);
      if (pathParts.length !== patternParts.length) return null;

      const params = {};

      for (let index = 0; index < patternParts.length; index += 1) {
        const patternPart = patternParts[index];
        const pathPart = pathParts[index];

        if (patternPart.startsWith(":")) {
          if (!/^\d+$/.test(pathPart)) return null;
          params[patternPart.slice(1)] = pathPart;
          continue;
        }

        if (patternPart !== pathPart) return null;
      }

      return params;
    },
  };
}
