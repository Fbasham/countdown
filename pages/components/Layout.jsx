import Head from "next/head"

function Layout({children}) {
  return (
    <>
    <Head>
      <title>{children.props.title}</title>
    </Head>
    <div className="flex flex-col h-[100vh]">
      <nav className="bg-blue-500 grow-[1]">
        nav
      </nav>
      <main className=" bg-yellow-100 grow-[20]">
        {children}
      </main>
      <footer className="bg-green-500 grow-[1]">
        &copy; {new Date().getFullYear()}
      </footer>
    </div>
    </>
  )
}

export default Layout