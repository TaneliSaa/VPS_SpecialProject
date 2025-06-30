import './globals.css'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {/* Layout UI */}
                {/* Place children where you want to render a page or nested layout */}


                {/* Navbar */}
                <nav className="navbarStyle">
                    <p>Special Project Virtual Patient Simulations</p>
                </nav>


                <main>{children}</main>


            </body>
        </html>
    )
}


