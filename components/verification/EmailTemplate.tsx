"use server";
import * as React from "react";

interface EmailTemplateProps {
    name: string | null;
    redirectURL?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    redirectURL,
}) => (
  <div className="flex items-center justify-center flex-col mt-5 bg-white dark:bg-gray-900">
    <section className="max-w-2xl px-6 py-8 mx-auto">
        <header>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Auth UI
            </h1>
        </header>
        <main className="mt-8">
            <h2 className="text-gray-700 dark:text-gray-200">Hi {name}</h2>

            <p className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
                Please <a href={redirectURL} className="text-blue-600 hover:underline dark:text-blue-400">confirm</a> your email address {" "}
            </p>

            <p className="mt-8 text-gray-600 dark:text-gray-300">
                Thanks, <br />
                Meraki UI team
            </p>
        </main>

        <footer className="mt-8">
            <p className="text-gray-500 dark:text-gray-400">
                This email was sent to{" "}
                <a
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                    target="_blank"
                >
                    contact@authui.com
                </a>
                . If you'd rather not receive this kind of email, you can{" "}
                <a
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                >
                    unsubscribe
                </a>{" "}
                or{" "}
                <a
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                >
                    manage your email preferences
                </a>
                .
            </p>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Meraki UI. All Rights Reserved.
            </p>
        </footer>
    </section>
  </div>
);
