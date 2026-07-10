import goldenmomentsLogo from "../assets/img/logosdeempresa/goldenmoments.png";
import empresasImg from "../assets/img/logosdeempresa/img empresa goldenmoment.png";
import bionaturaspaLogo from "../assets/img/logosdeempresa/bionaturaspa.png";
import bionaturaspaImg from "../assets/img/logosdeempresa/img empresa bionaturaspa.png";
import lexycoLogo from "../assets/img/logosdeempresa/lexyco.png";
import lexycoImg from "../assets/img/logosdeempresa/img empresa lexyco.png";
import fluxcapitalLogo from "../assets/img/logosdeempresa/fluxcapital.png";
import fluxcapitalImg from "../assets/img/logosdeempresa/img empresa fluxcapital.png";
import ecotoursLogo from "../assets/img/logosdeempresa/ecotours.png";
import ecotoursImg from "../assets/img/logosdeempresa/img empresa ecotours.png";
import coopersbarbersLogo from "../assets/img/logosdeempresa/coopersbarbers.png";
import coopersbarbersImg from "../assets/img/logosdeempresa/img empresa coopersbarbers.png";

export const empresasMock = [
  {
    id: 1,
    nombre: "Golden Moments",
    descripcion:
      "Golden Moments es una empresa dedicada a la organización de eventos y celebraciones, ofreciendo servicios personalizados para cada ocasión.",
    ubicacion: "Madrid, España",
    correo: "contacto@goldenmoments.com",
    telefono: "+34 912 345 678",
    subtitulo: "Organización de eventos y celebraciones",
    rating: 4.5,
    servicios: [
     {
      titulo: "Coordinación integral",
      descripcion: "Gestión completa del evento, asegurando que cada proveedor, detalle y momento funcione en perfecta sincronía para una experiencia impecable.",
    },
    {
      titulo: "Gestión de proveedores",
      descripcion: "Coordinación y supervisión de todos los proveedores involucrados en el evento, garantizando calidad y cumplimiento de plazos.",
    },
    {
      titulo: "Decoración premium",
      descripcion: "Diseño y ejecución de decoraciones exclusivas y personalizadas para cada evento, creando ambientes únicos y memorables.",
    },
    {
      titulo: "Producción de eventos",
      descripcion: "Supervisión y coordinación de todos los aspectos técnicos y logísticos del evento, asegurando una ejecución impecable.",
     },
     {
      titulo: "Planificación de bodas",
      descripcion: "Asesoramiento y planificación integral de bodas, desde la conceptualización hasta la ejecución, para crear momentos inolvidables.",
     },
     {
      titulo: "Eventos corporativos",
      descripcion: "Organización de eventos empresariales, incluyendo conferencias, lanzamientos de productos y reuniones corporativas, adaptados a las necesidades de cada empresa.",
      }
  ],

    logo: goldenmomentsLogo,
    imagen: empresasImg
},
  
  {
    id: 4,
    nombre: "Bionatura Spa",
    descripcion:
      "Bionatura Spa se especializa en experiencias de bienestar y relajación, asegurando momentos únicos.",
    ubicacion: "Sevilla, España",
    correo: "contacto@bionaturaspa.com",
    telefono: "+34 954 567 890",
    subtitulo: "Experiencias de bienestar y relajación",
    rating: 4.6,
    servicios: [
    {
      titulo: "Masajes terapéuticos",
      descripcion: "Masajes diseñados para aliviar el estrés y mejorar la salud física y mental.",
    },
    {
      titulo: "Tratamientos faciales",
      descripcion: "Tratamientos especializados para el cuidado de la piel, adaptados a las necesidades individuales.",
    },
    {
      titulo: "Hidroterapia",
      descripcion: "Terapias de agua que promueven la relajación y el bienestar general.",
    },
    {
      titulo: "Aromaterapia",
      descripcion: "Uso de aceites esenciales para mejorar el bienestar emocional y físico.",
    },
    {
      titulo: "Programas de bienestar",
      descripcion: "Planes personalizados que combinan diferentes terapias para mejorar la salud y el bienestar.",
    },
    {
      titulo: "Yoga y meditación",
      descripcion: "Sesiones de yoga y meditación para promover la relajación y el equilibrio mental.",
    }
  ],  
    logo: bionaturaspaLogo,
    imagen: bionaturaspaImg
  },
 
 {
    id: 10,
    nombre: "Lex & Co.",
    descripcion:
      "Lex & Co. es un despacho de abogados especializado en derecho corporativo y asesoramiento integral.",
    ubicacion: "Madrid, España",
    correo: "contacto@lexyco.com",
    telefono: "+34 912 345 678",
    subtitulo: "Asesoramiento integral en derecho corporativo",
    rating: 4.6,
  
    servicios: [
      {
      titulo: "Asesoramiento legal",
      descripcion: "Asesoramiento integral en derecho corporativo, incluyendo contratos, fusiones y adquisiciones.",
    },
    {
      titulo: "Representación legal",
      descripcion: "Representación de clientes en litigios y procedimientos legales relacionados con el ámbito corporativo.",
    },
    {   
      titulo: "Cumplimiento normativo",
      descripcion: "Asesoramiento en cumplimiento normativo y regulatorio para empresas, asegurando el cumplimiento de leyes y regulaciones aplicables.",
    },
    { 
      titulo: "Propiedad intelectual",  
      descripcion: "Asesoramiento en propiedad intelectual, incluyendo patentes, marcas y derechos de autor.",
    },
    { 
      titulo: "Fusiones y adquisiciones",
      descripcion: "Asesoramiento en procesos de fusiones y adquisiciones, incluyendo due diligence y negociación de acuerdos.",
    },
    {
      titulo: "Contratos comerciales",
      descripcion: "Redacción y revisión de contratos comerciales, asegurando la protección de los intereses de los clientes.",
    }
  ],


    logo: lexycoLogo,
    imagen: lexycoImg
  },
  
   
  {
    id: 13,
    nombre: "Flux Capital",
    descripcion:
      "Flux Capital es una firma financiera especializada en inversiones y asesoramiento financiero.",
    ubicacion: "Madrid, España",
    correo: "contacto@fluxcapital.com",
    telefono: "+34 912 345 678",
    subtitulo: "Inversiones y asesoramiento financiero de vanguardia",
    rating: 4.8,
    servicios: [
      { 
        titulo: "Gestión de inversiones",
        descripcion: "Asesoramiento y gestión de inversiones personalizadas para maximizar el rendimiento financiero.",
      },
      {
        titulo: "Planificación financiera",
        descripcion: "Desarrollo de estrategias financieras a largo plazo para alcanzar objetivos personales y empresariales.",
      },
      {
        titulo: "Análisis de riesgo",
        descripcion: "Evaluación y gestión de riesgos financieros para proteger los activos y garantizar la estabilidad económica.",
      },
      {
        titulo: "Asesoramiento fiscal",
        descripcion: "Orientación en cuestiones fiscales para optimizar la carga tributaria y cumplir con las regulaciones legales.",
      },
      {
        titulo: "Fusiones y adquisiciones",
        descripcion: "Asesoramiento en procesos de fusiones y adquisiciones, incluyendo due diligence y negociación de acuerdos.",
      },
      {
        titulo: "Consultoría financiera",
        descripcion: "Servicios de consultoría para empresas y particulares en temas financieros y estratégicos.",
      }
    ],

    logo: fluxcapitalLogo,
    imagen: fluxcapitalImg
  },
  
 
  {
    id: 16,
    nombre: "EcoTours",
    descripcion:
      "EcoTours es una agencia de viajes especializada en turismo sostenible y experiencias ecológicas.",
    ubicacion: "Jaén, España",
    correo: "contacto@ecotours.com",
    telefono: "+34 912 345 678",
    subtitulo: "Turismo sostenible y experiencias ecológicas únicas",
    rating: 4.9,
    servicios: [
      {
        titulo: "Rutas de senderismo",
        descripcion: "Excursiones guiadas por entornos naturales, promoviendo la conservación y el respeto por la naturaleza.",
      },
      {
        titulo: "Viajes eco-friendly",    
        descripcion: "Viajes diseñados para minimizar el impacto ambiental y promover prácticas sostenibles.",
      },
      {
        titulo: "Experiencias en parques naturales",
        descripcion: "Actividades y experiencias en parques naturales, fomentando la educación ambiental y la apreciación de la biodiversidad.",
      },
      {
        titulo: "Alojamientos sostenibles",
        descripcion: "Selección de alojamientos que cumplen con estándares de sostenibilidad y respeto al medio ambiente.",
      },
      {
        titulo: "Programas de voluntariado ambiental",
        descripcion: "Oportunidades para participar en proyectos de conservación y protección del medio ambiente durante los viajes.",
      },
      {
        titulo: "Talleres de educación ambiental",
        descripcion: "Sesiones educativas sobre la importancia de la conservación y el turismo responsable.", 
      } 

    ],
    logo: ecotoursLogo,
    imagen: ecotoursImg
  },
  
  
  {
    id: 19,
    nombre: "Cooper Barber",
    descripcion:
      "Cooper Barber combina técnicas tradicionales con un enfoque moderno, ofreciendo servicios de alta calidad.",
    ubicacion: "Madrid, España",
    correo: "contacto@cooperbarber.com",
    telefono: "+34 912 345 678",
    subtitulo: "Barbería de alta calidad con enfoque moderno",
    rating: 4.9,
    servicios: [
      {
        titulo: "Corte de cabello",
        descripcion: "Cortes de cabello personalizados y adaptados a las preferencias del cliente.",  
      },
      {
        titulo: "Afeitado clásico",
        descripcion: "Afeitado tradicional con navaja, proporcionando una experiencia de barbería auténtica y relajante.",  
      },
      { 
        titulo: "Tratamientos de barba",
        descripcion: "Servicios de cuidado y mantenimiento de la barba, incluyendo recorte, perfilado y tratamientos especiales.",  
      },  
      {
        titulo: "Masajes faciales",
        descripcion: "Masajes diseñados para relajar los músculos faciales y mejorar la circulación, proporcionando una experiencia de bienestar completa.",  
      },
      {
        titulo: "Asesoramiento de estilo",
        descripcion: "Orientación personalizada sobre estilos de cabello y barba, adaptados a la forma del rostro y las preferencias del cliente.",  
      },
      {
        titulo: "Productos de cuidado personal",
        descripcion: "Venta de productos de alta calidad para el cuidado del cabello y la barba, recomendados por nuestros expertos barberos.",  
      }
    ],
    logo: coopersbarbersLogo,
    imagen: coopersbarbersImg
  }
];
    
