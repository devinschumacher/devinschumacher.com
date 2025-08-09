import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function DMCAPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <h1>DMCA Copyright Policy</h1>
          <p>
            This site respects the intellectual property rights of others and expects its users to do the same. 
            If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, 
            please provide the following information:
          </p>
          
          <ul>
            <li>A description of the copyrighted work that you claim has been infringed</li>
            <li>A description of where the material is located on the site</li>
            <li>Your contact information</li>
            <li>A statement that you have a good faith belief that use of the material is not authorized</li>
            <li>A statement that the information in the notification is accurate</li>
            <li>Your physical or electronic signature</li>
          </ul>
          
          <p>
            Please send DMCA notices to: contact@devinschumacher.com
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}