import { title } from "@/components/primitives";

export default function ErrorState() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Oops!</h1>
        <h2>Something went wrong. Please try refreshing the page.</h2>
      </div>
    </section>
  );
}
