import { ChevronRight } from "lucide-react";
import React from "react";

const Faq = () => {

      const faqs = [
        {
          question: "Is TaxPadi really 100% free?",
          answer: "Yes! We're completely free while we're building our community. As a startup, we believe in gaining traction first and proving our value. All features are available at no cost - no hidden fees, no credit card required, and no surprise charges."
        },
        {
          question: "Will you start charging in the future?",
          answer: "We may introduce premium features in the future, but we're committed to keeping core tax services free. Early users who join now will receive special lifetime benefits when we do introduce paid tiers."
        },
        {
          question: "Is TaxPadi FIRS-approved?",
          answer: "Yes, TaxPadi is fully compliant with FIRS regulations and our calculations follow all current Nigerian tax laws and rates for 2026. We regularly update our system to reflect any changes in tax legislation."
        },
        {
          question: "How secure is my financial data?",
          answer: "We use bank-level encryption (256-bit SSL) and never store your payment information. All data is encrypted at rest and in transit. We're ISO certified and follow international security standards to protect your information."
        },
        {
          question: "Can I file returns for multiple states?",
          answer: "Absolutely! TaxPadi supports multi-state tax filing, allowing you to manage obligations across different Nigerian states from one platform. This includes Lagos, Abuja, Rivers, Kano, and all other states."
        },
        {
          question: "What types of taxes can I calculate and file?",
          answer: "We support all major Nigerian tax types including Personal Income Tax (PIT), Corporate Tax, Value Added Tax (VAT), Capital Gains Tax (CGT), Withholding Tax (WHT), Education Tax, and more. Our AI understands the nuances of each tax type."
        },
        {
          question: "Do I need accounting knowledge to use TaxPadi?",
          answer: "Not at all! Our AI assistant guides you through every step in simple language. Just chat naturally about your tax situation, and TaxPadi will handle the complex calculations and filing requirements for you."
        },
        {
          question: "Can I upload receipts and documents?",
          answer: "Yes! You can upload images, PDFs, Excel files, and even record voice messages. Our AI can extract information from receipts, invoices, and other tax documents to automatically populate your returns."
        },
        {
          question: "How quickly can I get my Tax Clearance Certificate (TCC)?",
          answer: "Once you submit your TCC application through TaxPadi with all required documents, processing typically takes 5-10 business days depending on FIRS workload. We'll track your application and notify you of any updates."
        },
        {
          question: "What payment methods do you accept for tax payments?",
          answer: "We support bank transfers, debit/credit cards, USSD codes, and direct bank deposits. All major Nigerian banks are integrated. We make it easy to pay your taxes directly through the chat interface."
        },
        {
          question: "Can I use this for my business?",
          answer: "Absolutely! TaxPadi works for both individuals and businesses of all sizes - from freelancers and sole proprietors to SMEs and large corporations. We handle everything from simple personal income tax to complex corporate tax scenarios."
        },
        {
          question: "What if I make a mistake in my filing?",
          answer: "Our AI validates all information before submission to catch errors. If you discover a mistake after filing, we can help you file an amended return with FIRS. We also maintain a complete history of all your submissions."
        },
        {
          question: "Do you offer support if I get stuck?",
          answer: "Yes! Our AI assistant is available 24/7 to answer questions. For complex issues, you can escalate to our human tax specialists who are available during business hours. We also have a comprehensive help center."
        },
        {
          question: "Can I integrate TaxPadi with my accounting software?",
          answer: "Yes! We offer API access that allows integration with popular accounting software used in Nigeria. This enables automatic data sync and streamlined tax workflows for your business."
        },
        {
          question: "How do you handle tax deadlines?",
          answer: "We send proactive reminders before all major tax deadlines (Personal Income Tax - March 31, Corporate Tax - June 30, VAT - monthly by 21st, etc.). You'll never miss a deadline with our smart notification system."
        },
        {
          question: "Is my chat history saved?",
          answer: "Yes, all your conversations with TaxPadi are saved securely and persist across sessions. You can review past conversations, calculations, and advice anytime. You can also clear your history whenever you want."
        },
        {
          question: "Can I use voice messages instead of typing?",
          answer: "Definitely! You can record voice messages to ask questions or provide information. Our AI understands spoken Nigerian English and can transcribe and respond to voice inputs naturally."
        },
        {
          question: "What makes TaxPadi different from other tax services?",
          answer: "We're the first AI-powered tax assistant built specifically for Nigeria. We combine cutting-edge AI technology with deep knowledge of Nigerian tax law, making tax compliance as easy as having a conversation. Plus, we're completely free!"
        },
        {
          question: "Do you handle PAYE and payroll taxes?",
          answer: "Yes! We can help calculate and file PAYE (Pay As You Earn) taxes for employers, including pension contributions, NHF deductions, and other statutory deductions. Perfect for businesses managing employee payroll."
        },
        {
          question: "How accurate are the tax calculations?",
          answer: "Our AI maintains a 98%+ accuracy rate by using official FIRS tax tables and regulations. We regularly audit our calculations and update our system to reflect any changes in tax laws. However, we always recommend reviewing calculations before final submission."
        }
      ];
      
    return (
        <div>
              {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about TaxPadi
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 hover:shadow-lg transition">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900 text-lg">
                  {faq.question}
                  <ChevronRight className="w-5 h-5 text-emerald-600 transform group-open:rotate-90 transition" />
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
        </div>
    );
};

export default Faq;
