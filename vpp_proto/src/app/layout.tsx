import './globals.css'
import { AuthProvider } from './components/AuthContext'
import SimulationNavbar from './components/SimulationNavbar';



export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <AuthProvider>
            <html lang="en">
                <body>
                    {/* Layout UI */}
                    {/* Place children where you want to render a page or nested layout */}

                    <SimulationNavbar />
                    <main>{children}</main>
                </body>
            </html>
        </AuthProvider>
    );
}


