import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../utilities/routes';

export const faqinfo = [
  {
    title: '¿Qué significa Preaprobado?',
    content: (
      <>
        Significa que al ingresar a la plataforma Billpocket | KEO puedes
        conocer inmediatamente el monto máximo del préstamo que puedes
        solicitar.
      </>
    ),
    home: true,
  },
  {
    title: '¿Cómo solicitar?',
    content: (
      <>
        Simplemente tienes que indicar el monto que quieres solicitar como
        préstamo en la página de inicio o haciendo{' '}
        <Link to={ROUTES.REQUEST_LOAN}>clic aquí</Link> y confirmar a través del
        botón “Continuar”.
      </>
    ),
    home: true,
  },
  {
    title: '¿Cuánto es el interés?',
    content: (
      <>
        El interés del préstamo es del 10% sobre el monto solicitado más IVA.
        Este costo se aplica desde el momento en que lo solicitas.
      </>
    ),
    home: true,
  },
  {
    title: '¿Cuál es el plazo?',
    content: (
      <>
        El plazo máximo de pago es de 1 mes. El préstamo se cobrará en 22 cuotas
        diarias solo los días hábiles del mes. Al final del mes, habrás pagado
        todo tu préstamo.
      </>
    ),
    home: true,
  },
  {
    title: '¿Qué pasa si no pago una cuota?',
    content: (
      <>
        Si al intentar descontar la cuota de un día, el depósito que te realiza
        Billpocket de tus ventas del día anterior no es suficiente, el monto
        pendiente se suma a la cuota del día siguiente.
      </>
    ),
    home: true,
  },
  {
    title: '¿Cuánto tarda el desembolso?',
    content: (
      <>
        El préstamo es desembolsado en máximo 24 horas hábiles en tu cuenta
        asociada a Billpocket.
      </>
    ),
    home: true,
  },
];

export const steps = [
  {
    title: '1\n',
    content:
      'Ingresa a tu panel de administración Billpocket y haz clic en el banner de KEO',
  },
  {
    title: '2',
    content:
      'Elige el monto que quieres deslizando la barra o seleccionando un botón',
  },
  {
    title: '3',
    content:
      'Ten el resumen a mano derecha y acepta los Términos y Condiciones',
  },
  {
    title: '4',
    content:
      '¡Listo! al finalizar la solicitud te informaremos en cuánto tiempo recibirás tu préstamo',
  },
];

export const benefits = [
  {
    title: 'Préstamo preaprobado',
    icon: 'hand',
    content: (
      <p>
        Al ingresar al portal de <b style={{ color: '#ED4356' }}>KEO</b> puedes
        ver el monto del préstamo quetienes disponible.
      </p>
    ),
  },
  {
    title: 'Disponible 24/7',
    icon: 'calendar',
    content: <p>Acceso 24 horas del día los 7 días de la semana.</p>,
  },
  {
    title: 'Fácil y rápido',
    icon: 'cursor',
    content: <p>En solo 3 pasos realiza la solicitud.</p>,
  },
  {
    title: 'Préstamos al instante',
    icon: 'clock',
    content: (
      <p>Recibe tu préstamo al instante en tu cuenta asociada a Billpocket.</p>
    ),
  },
];

export const faqinfolong = [
  {
    title: '¿Qué es KEO?',
    content: (
      <>
        Somos una fintech y tenemos como objetivo promover la inclusión
        financiera, brindando a todos, independiente de su historial crediticio,
        la posibilidad de acceder a productos financieros de forma fácil, rápida
        y segura a través de la tecnología. Billpocket tiene una alianza con KEO
        para ofrecer préstamos preaprobados para los comercios que hacen parte
        de la red de Billpocket.
      </>
    ),
    link: {
      url: ROUTES.CONTACT,
      label: 'Contactanos',
    },
  },
  {
    title: '¿Qué significa Preaprobado?',
    content: (
      <>
        Significa que al ingresar a la plataforma Billpocket | KEO puedes
        conocer inmediatamente el monto máximo del préstamo que puedes solicitar
        en el momento. Esto gracias a que previamente hemos hecho una evaluación
        de tu perfil de riesgo con base en la cual hemos determinado la cantidad
        máxima que puedes solicitar como préstamo.
      </>
    ),
    link: {
      url: ROUTES.CONTACT,
      label: 'Contactanos',
    },
  },
  {
    title: '¿Cómo solicito un préstamo?',
    content: (
      <>
        Simplemente tienes que indicar el monto que quieres solicitar en la
        página de inicio o haciendo{' '}
        <Link to={ROUTES.REQUEST_LOAN}>clic aquí</Link> y confirmar a través del
        botón “Continuar”. <br />
        En algunos casos, tendrás que ingresar algunos datos, foto de tu INE y
        comprobante de domicilio. Solicitamos estos datos para confirmar tu
        identidad y poder continuar entregándote este beneficio.
      </>
    ),
    link: {
      url: ROUTES.REQUEST_LOAN,
      label: 'Continuar',
    },
  },
  {
    title: '¿Qué sucede después de enviar mi INE y Comprobante de domicilio?',
    content: (
      <>
        En algunos casos, te pediremos datos, foto de tu INE y comprobante
        domiciliario. Esto, con el fin de verificar tu identidad. <br />
        Una vez ingresas esos datos, te pediremos que esperes máximo 48 horas
        hábiles para recibir una respuesta. Nuestro equipo estará verificando la
        información y te contactará a través de correo electrónico para darte
        una respuesta. <br />
        Si tus datos fueron verificados correctamente, puedes volver al portal
        Billpocket | KEO a solicitar un nuevo préstamo. <br />
      </>
    ),
    link: {
      url: ROUTES.CONTACT,
      label: 'Contactanos',
    },
  },
  {
    title: '¿Cómo sé el monto máximo que puedo solicitar?',
    content: (
      <>
        El monto máximo que tienes disponible lo puedes ver en la página de
        inicio de la plataforma Billpocket | KEO. Esta cantidad puede cambiar
        diariamente en función de la cantidad de pagos con tarjeta que recibas y
        el historial de préstamos que hayas tenido con KEO. Recuerda que entre
        más pagos con tarjeta recibas y más préstamos realices, tu preaprobado
        podría aumentar.
      </>
    ),
    link: {
      url: ROUTES.CONTACT,
      label: 'Contactanos',
    },
  },
  {
    title: '¿Cuánto es el interés?',
    content: (
      <>
        El interés del préstamo es del 10% sobre el monto solicitado. Este costo
        se aplica desde el momento en que lo solicitas y puedes conocer el monto
        total que vas a pagar inmediatamente. KEO no cobra intereses como podría
        ocurrir con otros préstamos y tampoco genera intereses moratorios. Así
        mismo, no existen penalizaciones, pero si no pagas a tiempo tu monto
        preaprobado podría disminuir.
      </>
    ),
    link: {
      url: ROUTES.CONTACT,
      label: 'Contactanos',
    },
  },
  {
    title: '¿Cuál es el plazo?',
    content: (
      <>
        El plazo máximo de pago es de 1 mes. El préstamo se cobrará en 22 cuotas
        diarias solo los días laborales del mes. Al final del mes, habrás pagado
        todo tu préstamo.
      </>
    ),
    link: {
      url: ROUTES.CONTACT,
      label: 'Contactanos',
    },
  },
  {
    title: '¿Dónde puedo ver cuánto debo pagar?',
    content: (
      <>
        En la sección <Link to={ROUTES.REQUEST_LOAN}>“Solicitar”</Link> puedes
        simular el monto que quieres solicitar usando la barra deslizadora, si
        ingresas desde el celular puedes elegir el monto escribiéndolo en la
        casilla o seleccionando los botones. Una vez seleccionado el monto, el
        simulador genera automáticamente el monto total a pagar y la fecha del
        último pago, la cual corresponde a 22 días laborales después del
        desembolso del préstamo.
      </>
    ),
    link: {
      url: ROUTES.REQUEST_LOAN,
      label: 'Solicitar',
    },
  },
  {
    title: '¿Dónde y cómo puedo pagar mi préstamo?',
    content: (
      <>
        El pago inicia el siguiente día laboral después del desembolso del
        préstamo. El pago se realiza mediante 22 cuotas iguales (en días
        laborales) que serán descontadas automáticamente de los depósitos
        diarios de tus ventas que realiza Billpocket en tu cuenta.
      </>
    ),
    link: {
      url: ROUTES.CONTACT,
      label: 'Contactanos',
    },
  },
  {
    title: '¿Que pasa si no logro pagar una cuota?',
    content: (
      <>
        Si al intentar descontar la cuota de un día, el depósito que te realiza
        Billpocket de tus ventas del día anterior no es suficiente, el monto
        pendiente se suma a la cuota del día siguiente.
      </>
    ),
    link: {
      url: ROUTES.CONTACT,
      label: 'Contactanos',
    },
  },
  {
    title: '¿Cómo puedo consultar el estado de mis préstamos pendientes?',
    content: (
      <>
        En la sección <Link to={ROUTES.LOANS}>“Mis préstamos”</Link> tienes la
        opción de consultar los préstamos que se encuentran en proceso de pago,
        “Pendientes”. Si cuentas con más de un préstamo en proceso, debes
        seleccionar el que deseas consultar.
      </>
    ),
    link: {
      url: ROUTES.LOANS,
      label: 'Mis préstamos',
    },
  },
  {
    title: '¿Cómo puedo consultar el estado de mis préstamos cerrados?',
    content: (
      <>
        En la sección <Link to={ROUTES.LOANS}>“Mis préstamos”</Link> tienes la
        opción de consultar los préstamos que ya has pagado. Ahí mismo podrás
        descargar comprobantes de no adeudo o finiquito por cada uno de los
        préstamos cerrados con KEO.
      </>
    ),
    link: {
      url: ROUTES.LOANS,
      label: 'Mis préstamos',
    },
  },
  {
    title: '¿Dónde puedo consultar los Términos y Condiciones de mi préstamo?',
    content: (
      <>
        Puedes consultar los términos y condiciones del préstamo KEO justo antes
        de solicitar un préstamo haciendo click en “Términos y condiciones” o en
        la página: www.billpocket.keomexico.com
      </>
    ),
    link: {
      url: ROUTES.CONTACT,
      label: 'Contactanos',
    },
  },
  {
    title: '¿Cómo puedo usar el préstamo?',
    content: (
      <>
        Una vez el préstamo ha sido desembolsado en tu cuenta, puedes usarlo en
        lo que quieras.
      </>
    ),
    link: {
      url: ROUTES.CONTACT,
      label: 'Contactanos',
    },
  },
  {
    title: '¿Cuánto tiempo se demora el desembolso?',
    content: (
      <>
        El préstamo es desembolsado inmediatamente en tu cuenta asociada a
        Billpocket.
      </>
    ),
    link: {
      url: ROUTES.CONTACT,
      label: 'Contactanos',
    },
  },
  {
    title:
      '¿Puedo solicitar un préstamo si no he terminado de pagar el anterior?',
    content: (
      <>
        Si, siempre y cuando cuentes con monto preaprobado disponible. Es
        posible solicitar los préstamos que quieras hasta que llegues al cupo
        máximo preaprobado. Puedes consultar el monto preaprobado disponible en
        la sección <Link to={ROUTES.REQUEST_LOAN}>“Solicitar”</Link>.
      </>
    ),
    link: {
      url: ROUTES.REQUEST_LOAN,
      label: 'Solicitar',
    },
  },
  {
    title:
      '¿Cómo puedo consultar los pagos que me han descontado hasta el momento?',
    content: (
      <>
        En la sección <Link to={ROUTES.LOANS}>“Mis préstamos”</Link> tienes la
        opción de consultar los préstamos pendientes y el detalle de los pagos.
      </>
    ),
    link: {
      url: ROUTES.LOANS,
      label: 'Mis préstamos',
    },
  },
  {
    title:
      '¿Existen multas o penalidades por pagos fuera del tiempo determinado?',
    content: <>NO cobramos ningún tipo de penalidad.</>,
  },
  {
    title: 'NO cobramos ningún tipo de penalidad.',
    content: (
      <>
        La mejor manera de resolver cualquier duda o consulta es a través del{' '}
        <Link to={ROUTES.CONTACT}>“Formulario de contacto”</Link> en la sección
        “Ayuda” que encuentras en el menú superior. El equipo de atención te
        responderá máximo 24 horas después de la recepción de tu consulta.
      </>
    ),
    link: {
      url: ROUTES.CONTACT,
      label: 'Contactanos',
    },
  },
];
