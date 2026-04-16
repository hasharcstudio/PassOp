import { Logo } from '../components/common';
import { Card } from '../components/ui';

const highlights = [
  {
    title: 'Secure by design',
    description:
      'Passwords are stored locally in your browser, so you keep full control over your sensitive data.',
  },
  {
    title: 'Fast workflow',
    description:
      'Add, edit, and copy credentials in seconds with a focused interface built for daily use.',
  },
  {
    title: 'Simple and clean',
    description:
      'No clutter, no unnecessary setup. Just an efficient manager for accounts you use every day.',
  },
];

/**
 * About page
 */
const About = () => {
  return (
    <section className="mycontainer">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Logo size="lg" showIcon className="justify-center" />
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">About PassOP</h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            PassOP helps you organize and access your credentials quickly while keeping your experience clean,
            responsive, and reliable.
          </p>
        </div>

        <Card className="p-6 sm:p-8 bg-white/90 border border-slate-200 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-3">Why this project exists</h2>
          <p className="text-slate-600 leading-relaxed">
            Managing accounts across multiple websites can become messy. PassOP was built to give you a lightweight
            password manager with a straightforward interface, so your credentials stay organized and easy to manage.
          </p>
        </Card>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {highlights.map((item) => (
            <Card key={item.title} className="p-5 bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
