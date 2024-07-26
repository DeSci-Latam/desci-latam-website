import { useState } from "react";
import { color, motion } from "framer-motion";



const FAQData = [
  {
    question: "¿Qué es la batalla de ciencia?",
    answer:
      "Es una competencia diseñada para promover y presentar proyectos de investigación de diversas áreas científicas. Su propósito es proporcionar una plataforma donde científicos, investigadores y tecnólogos puedan presentar sus proyectos innovadores, independientemente de si utilizan tecnologías descentralizadas (Web3) o no. Además, el evento busca introducir a los investigadores en el mundo de Web3 y la ciencia descentralizada (DeSci), mostrando cómo estas tecnologías pueden transformar y beneficiar sus trabajos y procesos de investigación.",
  },
  {
    question: "¿Por qué participar?",
    answer:
      "Participar en la batalla de ciencia ofrece una oportunidad única para que los investigadores presenten sus proyectos a una audiencia diversa de expertos, inversores y otros entusiastas de la ciencia. Al participar, los equipos pueden:\n\n- Ganar premios en dinero y tener la posibilidad de obtener financiamiento adicional.\n- Obtener visibilidad y reconocimiento para sus proyectos.\n- Conectar con posibles colaboradores y financiadores.\n- Aprender sobre tecnologías Web3 y DeSci y cómo pueden aplicarse a sus investigaciones.\n- Conectar con proyectos existentes y explorar oportunidades de colaboración.\n\nEstas oportunidades hacen del PITCH DESCI DAY un evento imperdible para cualquier investigador interesado en potenciar y expandir el alcance de su trabajo.",
  },
  {
    question: "¿Qué buscamos?",
    answer:
      "Buscamos proyectos en diversas áreas de investigación. Queremos apoyar a equipos de investigación que estén desarrollando soluciones originales con el potencial de tener un impacto significativo en la sociedad o la industria. Nuestro objetivo es presentar una amplia gama de proyectos científicos y tecnológicos, mientras introducimos a los participantes a las tecnologías Web3 y DeSci, demostrando cómo pueden integrarse y utilizarse para mejorar la transparencia, la financiación y la colaboración en el ámbito científico.",
  },
  {
    question: "¿Cuáles son los requisitos para anotarme?",
    answer:
      "Para participar en el DESCI DAY, los proyectos deben cumplir con los siguientes requisitos:\n\n- Estar liderados por investigadores o equipos de investigación de instituciones académicas, laboratorios o empresas.\n- Presentar una descripción clara y concisa del proyecto, incluyendo el objetivo principal, el problema que busca resolver y las aplicaciones prácticas.\n- Indicar el estado actual del proyecto (idea, en desarrollo, completado, implementación) y la duración estimada hasta la fecha.\n- Proporcionar información sobre el equipo y cualquier colaboración con otras instituciones o empresas.\n- Completar el formulario de inscripción antes de la fecha límite (7 de agosto).\n\nEstos puntos completan la información necesaria para entender y participar en el PITCH DESCI DAY. Si tienes alguna otra pregunta o necesitas más detalles, no dudes en preguntar.",
  },
  {
    question: "¿Dónde me anoto?",
    answer: "Debes inscribirte aquí.",
  },
  {
    question: "¿Cuál es la fecha límite para anotarse?",
    answer: "La fecha límite es el 7 de agosto.",
  },
  {
    question: "¿Tengo que pagar para anotarme a la batalla?",
    answer: "No, las inscripciones y el evento son gratuitos.",
  },
  {
    question: "¿Qué es un pitch?",
    answer: "Es una breve presentación de tu proyecto/ investigación. Debe durar 10 minutos o menos.",
  },
  {
    question: "¿En qué idioma debo hacer mi pitch?",
    answer: "Puedes hacerlo en inglés o español.",
  },
  {
    question: "¿Qué día será el pitch?",
    answer: "A definir.",
  },
  {
    question: "¿Cuál es el premio de la Batalla de pitch?",
    answer: "A definir.",
  },
  {
    question: "¿Quiénes serán los jurados?",
    answer: "Podés ver los jurados aquí. Definir e insertar link",
  },
  {
    question: "¿Cuándo se anuncian los ganadores?",
    answer: "A definir.",
  },
  {
    question: "¿Cómo y cuándo será entregado el premio?",
    answer: "A definir.",
  },
  {
    question: "¿Cómo debo usar los fondos recibidos?",
    answer: "A definir.",
  }
];


export const FAQBatallaES = () => (
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
