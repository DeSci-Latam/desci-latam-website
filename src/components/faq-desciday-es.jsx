import { useState } from "react";
import { motion } from "framer-motion";



const FAQData = [
  {
    question: "¿Qué es DeSci Day?",
    answer:
      "Es un evento enfocado en ciencia, blockchain y ciencia descentralizada. Habrá conferencias, workshops y financiamiento. El evento está dirigido a académicos y público en general y se realiza como parte de Aleph.",
  },
  {
    question: "¿Qué día se realiza el evento?",
    answer: "El evento se realizará los días 12 y 13 de agosto.",
  },
  {
    question: "¿Dónde se realiza?",
    answer: 
      "Lugar del evento: Canal 9 Hangar 8, Conde 51, en Palermo, Buenos Aires. Puedes ver la ubicación en este enlace:  https://maps.app.goo.gl/EgGKbDG5DGVfHQXa6",
  },
  {
    question: "¿Cuál es el objetivo del evento?",
    answer:
      "El objetivo del evento es acercar a científicos y proyectos a la ciencia descentralizada, apoyar y dar a conocer proyectos y talentos de la ciencia argentina, y conectar científicos con posibles inversores.",
  },
  {
    question: "¿Tengo que pagar entrada al evento?",
    answer:
      "No, el DeSci Day es gratuito, solo debes inscribirte. Si quieres acceder a otras charlas de crecimiento o a la experiencia completa de Aleph, puedes sacar tu entrada aquí.",
  },
  {
    question: "¿Cómo saco mi entrada para el DeSci Day?",
    answer: "(insertar form de inscripción)",
  },
  {
    question: "¿Cómo está financiando este evento?",
    answer:
      "El evento está financiado y puede llevarse a cabo gracias a Crecimiento y a otros sponsors.",
  },
  {
    question: "¿Cuál es el cronograma del evento?",
    answer: "Puedes ver la agenda de actividades aquí. https://cutt.ly/fecjkRGu "
  }
];


export const FAQES = () => (
  <section className="relative -mt-8 sm:mt-0 pt-12 sm:pt-16 pb-16 bg-blueGray-50 overflow-hidden">
    <div className="absolute -top-10" id="FAQ" />
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative z-10 container px-2 sm:px-8 lg:px-4 mx-auto w-11/12 sm:w-full">
        <div className="md:max-w-4xl mx-auto">
          <p className="mb-7 block-subtitle text-center">¿Tenés alguna pregunta?</p>
          <h2 className="mb-16 block-big-title text-center text-3xl">
          Preguntas Frecuentes
          </h2>
          <div className="mb-11 flex flex-wrap -m-1">
            {FAQData.map((item, index) => (
              <div className="w-full p-1" key={`${item.question}-${index}`}>
                <FAQBox
                  title={item.question}
                  content={item.answer}
                  key={`${item.question}-${item.answer}`}
                  defaultOpen={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const FAQBox = ({ defaultOpen, title, content }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className=" sm:pt-6  px-3 sm:px-8  rounded-3xl bg-bgDark3 main-border-gray-darker  relative hover:bg-bgDark3Hover cursor-pointer transition"
      onClick={() => setIsOpen(!isOpen)}
    >

      <div className="flex flex-col border-b-2 border-gray-800     justify-center items-start">
        <h3 className=" content-title text-lg pt-3 sm:pt-0 pr-8 sm:pr-0">{title}</h3>
        <p
          className={`text-secondaryText mb-4  transition-height duration-300 overflow-hidden ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          {content}
        </p>
      </div>
      <div className="absolute top-6 right-4 sm:top-8 sm:right-8">
        <svg
          width="28px"
          height="30px"
          viewBox="0 0 20 20"
          fill="#43A1D5"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-500  ${
            isOpen ? "rotate-[180deg] " : "rotate-[270deg]"
          }`}
        >
          <path
            d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
           
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  );
};