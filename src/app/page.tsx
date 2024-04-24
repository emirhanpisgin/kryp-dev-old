import TypeWriter from "@/components/TypeWriter";

export default function Home() {
    return (
        <main className="grid place-items-center h-full bg-inherit">
            <div className="flex flex-col gap-5">
                <TypeWriter text="Kryp.Dev" duration={1} className="text-7xl" />
            </div>
        </main>
    );
}
