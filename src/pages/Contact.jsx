import { useMemo, useState } from 'react';
import { Card, Button, Input } from '../components/ui';

const INITIAL_STATE = {
  name: '',
  email: '',
  message: '',
};

/**
 * Contact page
 */
const Contact = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  const isDisabled = useMemo(
    () => !form.name.trim() || !form.email.trim() || !form.message.trim(),
    [form]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isDisabled) return;

    setSubmitted(true);
    setForm(INITIAL_STATE);
  };

  return (
    <section className="mycontainer">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 sm:p-8 border border-slate-200 shadow-lg bg-white">
          <h1 className="text-3xl font-bold text-slate-800">Contact</h1>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Have feedback or a feature idea for PassOP? Send a quick message and we will get back to you.
          </p>

          {submitted && (
            <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm sm:text-base">
              Thanks for reaching out. Your message has been received.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Your name
              </label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Type your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition bg-white"
                placeholder="Tell us what would make PassOP better"
                required
              />
            </div>

            <Button type="submit" disabled={isDisabled} className="w-full sm:w-auto">
              Send message
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
