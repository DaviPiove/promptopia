import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
    title: "Promptopia",
    description: "Descover & Share AI Prompts",
};

interface IRootLayoutProps {
    children: JSX.Element;
}

const RootLayout = ({ children }: IRootLayoutProps) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>

                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
};

export default RootLayout;
