// deno-lint-ignore-file no-explicit-any
// export interface Customer {
//     first_name: string;
//     last_name: string;
//     email: string;
//     verified_email: boolean;
//     password: string;
//     password_confirmation: string;
//     send_email_welcome: boolean;
//     metafields: {
//         key: string;
//         value: string;
//         type: string;
//         namespace: string;
//     }[];
// }

// export interface Props {
//     data: Customer;
// }

const action = async (
  props: any,
  _req?: Request,
) => {
  const myHeaders = new Headers();
  // myHeaders.append(
  //   "X-Shopify-Access-Token",
  //   "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",
  // );
  myHeaders.append("Content-Type", "application/json");

  const customerData = props;

  const createCustomerObject = (data: any) => {
    return {
      customer: {
        ...data,
      },
    };
  };

  const raw = JSON.stringify(createCustomerObject(customerData));

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      "https://click-house-totvs-ip-campinas-bp.myshopify.com/admin/api/2024-04/customers.json",
      requestOptions,
    );
    const result = await response.text();
    console.log("result post client", result);

    if (response.status >= 200 && response.status < 300) {
      console.log("result post client", result);
      return {
        type: "success",
        data: result,
      };
    }

    if (response.status >= 400 && response.status < 500) {
      console.log("result post client", result);
      return {
        type: "error",
        data: result,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      type: "error",
      data: error.errors,
    };
  }
};

export default action;
