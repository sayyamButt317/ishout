interface Props {
  phone: string;
  company_name: string;
}

export const WhatsAppShareButton = ({ phone, company_name }: Props): void => {
  if (!phone) return;

  let formattedPhone = phone.replace(/\D/g, "");
  if (formattedPhone.startsWith("0")) {
    formattedPhone = `92${formattedPhone.slice(1)}`;
  }

  const message = encodeURIComponent(
    `Hello ${company_name}, this is from Ishout Admin.`
  );
  const whatsappWebURL = `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${message}`;

  window.open(whatsappWebURL, "whatsapp_web");
};
