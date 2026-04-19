// 3. Create a Layout Component
// Create a new component called Layout

// Accept children as a prop

// Render a layout structure (e.g. header, main content area, footer) with the children prop rendered inside the main content area

// Pass children by adding them in between the tags of the parent component

export function PageLayout(props) {
  console.log(props);
  return (
    <div>
      <header>{props.headerName}</header>
      <main>{props.children}</main>
      <footer>Some footer</footer>
    </div>
  );
}

export function FullScreenLayout(props) {
  console.log(props);
  return (
    <div className="fullscreen">
      <main>{props.children}</main>
    </div>
  );
}
