// sendSMS.tsx

import axios from 'axios';

export const sendSMS = async (mobile: string, message: string, templateId: string) => {
  const baseUrl = 'http://api.bulksmsgateway.in/sendmessage.php';
  const user = 'mtakwani';
  const password = '9824233194';
  const sender = 'ZINGPI';

  // Replace symbols in message
  const encodedMessage = message
    .replace(/&/g, 'Jg==')
    .replace(/\+/g, 'Kw==')
    .replace(/#/g, 'Iw==');

  const url = `${baseUrl}?user=${user}&password=${password}&mobile=${mobile}&message=${encodedMessage}&sender=${sender}&type=3&template_id=${templateId}`;

  try {
    const response = await axios.get(url);
    return response.status;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};
