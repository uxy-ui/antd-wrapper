import { useWorkBenchHook, type WorkBenchComponent } from "@/layout";

export const WorkBench: WorkBenchComponent = (props) => {
  const { areas, dimensions } = props;
  const { style } = useWorkBenchHook(dimensions);
  return (
    <div className="work-bench" style={style}>
      <header className="root" style={{ overflow: "hidden" }}>
        {areas?.root}
      </header>
      <nav
        className="nav"
        style={{
          gridArea: "nav",
        }}
      >
        {areas?.nav}
      </nav>
      <div
        className="home"
        style={{
          gridArea: "home",
        }}
      >
        {areas?.home}
      </div>
      <aside
        className="menu"
        style={{
          gridArea: "menu",
        }}
      >
        {areas?.menu}
      </aside>
      <nav
        className="path"
        style={{
          gridArea: "path",
        }}
      >
        {areas?.path}
      </nav>
      <main
        className="main"
        style={{
          gridArea: "main",
        }}
      >
        {areas?.main}
      </main>
      <footer
        className="toggle"
        style={{
          gridArea: "toggle",
        }}
      >
        {areas?.toggle}
      </footer>
      <footer
        className="footer"
        style={{
          gridArea: "footer",
        }}
      >
        {areas?.footer}
      </footer>
    </div>
  );
};
