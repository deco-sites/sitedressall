interface Field {
  key: string;
  value: unknown;
}

interface Props {
  fields: Field[];
}

const action = async (
  { fields }: Props,
  _req?: Request,
): Promise<unknown> => {
  const myHeaders = new Headers();
  myHeaders.append(
    "X-Shopify-Access-Token",
    "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",
  );
  myHeaders.append("Content-Type", "application/json");

  const mutation = `
        mutation metaobjectCreate($metaobject: MetaobjectCreateInput!) {
            metaobjectCreate(metaobject: $metaobject) {
                metaobject {
                    handle
                    fields {
                        key
                        value
                    }
                }
                userErrors {
                    field
                    message
                    code
                }
            }
        }
    `;

  const emailField =
    (fields.find((field) => field.key === "email")?.value as string).replace(
      /[^a-z0-9]/gi,
      "-",
    );

  const variables = {
    metaobject: {
      type: "artista",
      fields: fields,
      handle: emailField,
    },
  };

  const raw = JSON.stringify({
    query: mutation,
    variables: variables,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      "https://19816d-54.myshopify.com/admin/api/2024-04/graphql.json",
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      type: "error",
      data: error.errors,
    };
  }
};

export default action;
