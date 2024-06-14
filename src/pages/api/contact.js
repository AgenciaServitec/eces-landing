export const POST = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const phoneNumber = data.get("phoneNumber");
  const message = data.get("message");

  const fields = {
    name: "Nombres",
    email: "Email",
    company: "Compania",
    phoneNumber: "Teléfono",
  };

  if (!name || !email || !phoneNumber) {
    return new Response(
      JSON.stringify({
        message: `Faltan los siguientes campos: ${fields["name"]},${fields["email"]}, ${fields["company"]}, ${fields["phoneNumber"]}`,
      }),
      { status: 400 },
    );
  }

  const mapContact = {
    contact: {
      fullName: name,
      email,
      phone: {
        prefix: "+51",
        number: phoneNumber,
      },
      message,
      hostname: "eces.pe",
    },
  };

  const response = await fetch(
    "https://api-servitecsales.web.app/emails/contact",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(mapContact),
    },
  );

  console.log("response: ", response);

  return new Response(
    JSON.stringify({
      ok: true,
      message: "¡Mensaje exito!",
    }),
    { status: 200 },
  );
};
