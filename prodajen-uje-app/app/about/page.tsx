import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700">
          About Prodajen Uje
        </h1>
      </div>

      <section className="relative w-full h-[45vh] mb-12">
        <Image
          src="/about.jpg"
          alt="Olive Grove"
          fill
          priority
          className="object-cover rounded-2xl shadow-lg brightness-95"
        />
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8 text-gray-800">
        <h2 className="text-3xl font-bold text-green-800 mb-6">
          Supporting Local Growers, Sharing Authentic Flavors
        </h2>

        <p className="text-lg leading-relaxed mb-6">
          <strong>Prodajen Uje</strong> is a decentralized online marketplace that connects
          small, independent olive oil producers with people who value authenticity,
          sustainability, and fair prices.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Our mission is to give local growers a place to sell their hand-crafted,
          eco-grown olive oil directly to customers, without middlemen or unfair
          market pressure. We believe true quality comes from passion, tradition,
          and respect for the land.
        </p>

        <p className="text-lg leading-relaxed mb-10">
          By buying on <strong>Prodajen Uje</strong>, you’re not just purchasing olive oil —
          you’re supporting family farms, preserving Mediterranean heritage, and tasting
          olive oil the way nature intended — pure and honest.
        </p>

        <div className="text-center mt-12">
          <p className="text-2xl italic text-green-700">
            “From our groves to your table — authentic, fair, and pure.”
          </p>
        </div>
      </section>
    </main>
  );
}