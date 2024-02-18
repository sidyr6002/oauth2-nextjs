import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: [ "400",  "600"] });

export default function Home() {
  return (
		<main className="min-h-screen flex justify-center items-center bg-black-gradient bg-blend-multiply">
			<div className="space-y-6 text-center text-background">
				<h1 className={cn("text-6xl font-semibold drop-shadow-md", font.className)}>Auth</h1>
				<p className={cn("text-xl font-normal", font.className)}>A simple authentication service</p>
				<div>
				<LoginButton>
					<Button variant="default" size="lg" className="rounded-sm w-48 shadow-sm shadow-blue-600/70">
						Sign In
					</Button>
				</LoginButton>
				</div>
			</div>
		</main>
  );
}
