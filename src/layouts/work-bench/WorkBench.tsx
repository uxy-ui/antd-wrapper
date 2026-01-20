import {
  useWorkBenchHook,
  type WorkBenchComponent,
} from '@/layouts/work-bench/index';

export const WorkBench: WorkBenchComponent = (props) => {
  const { areas, dimensions, templateAreas } = props;
  const { style } = useWorkBenchHook(dimensions, templateAreas);
  return (
    <div className="work-bench" style={style}>
      <header
        className="root"
        style={{
          width: '100%',
          height: '100%',
          gridArea: 'root',
          overflow: 'hidden',
        }}
      >
        {areas?.root}
      </header>
      <nav
        className="nav"
        style={{
          width: '100%',
          height: '100%',
          gridArea: 'nav',
          overflow: 'hidden',
        }}
      >
        {areas?.nav}
      </nav>
      <div
        className="home"
        style={{
          width: '100%',
          height: '100%',
          gridArea: 'home',
          overflow: 'hidden',
        }}
      >
        {areas?.home}
      </div>
      <aside
        className="menu"
        style={{
          width: '100%',
          height: '100%',
          gridArea: 'menu',
          overflow: 'hidden',
        }}
      >
        {areas?.menu}
      </aside>
      <nav
        className="path"
        style={{
          width: '100%',
          height: '100%',
          gridArea: 'path',
          overflow: 'hidden',
        }}
      >
        {areas?.path}
      </nav>
      <main
        className="main"
        style={{
          width: '100%',
          height: '100%',
          gridArea: 'main',
          overflow: 'hidden',
        }}
      >
        {areas?.main}
      </main>
      <footer
        className="toggle"
        style={{
          width: '100%',
          height: '100%',
          gridArea: 'toggle',
          overflow: 'hidden',
        }}
      >
        {areas?.toggle}
      </footer>
      <footer
        className="footer"
        style={{
          width: '100%',
          height: '100%',
          gridArea: 'footer',
          overflow: 'hidden',
        }}
      >
        {areas?.footer}
      </footer>
    </div>
  );
};
