"use client"
import Link from 'next/link'
import Home from "../../pages/home"
import Play from "../../pages/play"
import 'regenerator-runtime/runtime'



export default function App() {
  return (
    <Layout></Layout>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/home">About</Link>
          </li>
          <li>
            <Link href="/play">Dashboard</Link>
          </li>
          <li>
            <Link href="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}

    </div>
  );
}
