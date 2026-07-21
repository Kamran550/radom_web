import ApplyHero from "@/components/sections/apply/ApplyHero";
import ApplyForm from "@/components/sections/apply/ApplyForm";

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <ApplyHero />
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ApplyForm />
        </div>
      </section>
    </main>
  );
}
