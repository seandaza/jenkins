export const CREATE_LOAN_ERROR = {
  'Missing Authorization header':
    'Error con la sesión. Por favor cierre la pestaña y vuelva acceder desde el portal de billpocket',
  'Token malformed or not found.':
    'Error con la sesión. Por favor cierre la pestaña y vuelva acceder desde el portal de billpocket',
  'Invalid token.':
    'Sesión expirada. Por favor cierre la pestaña y vuelva acceder desde el portal de billpocket',
  'Incorrect authentication credentials.':
    'Error con la sesión. Por favor cierre la pestaña y vuelva acceder desde el portal de billpocket',
  'No data sent':
    'No se ha enviado la información correctamente, por favor comuniquese con soporte debido a que ha ocurrido en la creación del préstamo',
  'The customer was not found on the DB':
    'Por favor comuniquese con soporte debido a que su usuario no fue registrado correctamente en base de datos',
  'The config id does not match the customer':
    'Por favor comuniquese con soporte debido a que su configuración de cuenta no esta vinculada a su cuenta',
  'The customer is not active':
    'Por favor comuniquese con soporte para activar su usuario',
  'The customer is waiting for loan info':
    'Estamos procesando otro préstamo solicitado',
  'The customer has loans that are not confirmed yet':
    'Estamos procesando otro préstamo solicitado',
  'The loan value is lower than minimal loan amount':
    'Error al solicitar el préstamo, valor del préstamo es menor al permitido.',
  'The loan value is higher than available preapproved amount':
    'Error al solicitar el préstamo, valor del préstamo es mayor al permitido.',
  'The loan has not approved the prerequisites':
    'Error al solicitar el préstamo, debido a que no cumple con los prerrequisitos.',
  'The partner send loan returned an error':
    'Por favor comuniquese con soporte debido a que el prestamo enviado por el socio ha retornado un error',
  default:
    'Error al solicitar el préstamo. Por favor vuelve a intentar solicitar un préstamo después, o comuniquese mediante alguno de nuestros canales',
};
