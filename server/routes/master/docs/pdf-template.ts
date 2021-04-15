
type Data = { master: string, orderId: string, customer: string, begin: string, price: string, service: string, masterEmail: string, customerEmail: string }

const pdfTemplate = (data: Data) => {
    const { master, orderId, customer, service, begin, price, customerEmail, masterEmail } = data
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order #${orderId}</title>
    <style>
      p {
        margin: 0;
      }
      .container {
        margin: 50px auto 100px;
        width: 400px;
        display: flex;
        flex-direction: column;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: rgb(29, 29, 29);
        line-height: 1.3;
        padding: 20px;
      }
      .container-title {
        font-weight: normal;
        margin: 5px 0;
      }
      .data {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .data-part {
        margin: 10px 0 20px;
        display: flex;
        flex-direction: column;
      }
      .data-divider {
        width: 100%;
        height: 1px;
        background: rgba(197, 197, 197, 0.7);
        margin: 5px 0 10px;
      }
      .data-amount {
        align-self: flex-end;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h3 class="container-title">Order #23</h3>
      <div class="data">
        <div class="data-part">
          <span class="data-part-title">Master's detail</span>
          <div class="data-divider"></div>
          <p>Name: ${master}</p>
          <p>Email: ${masterEmail}</p>
        </div>
        <div class="data-part">
          <p class="data-part-title">Customer's detail</p>
          <div class="data-divider"></div>
          <p>Name: ${customer}</p>
          <p>Email: ${customerEmail}</p>
        </div>
        <div class="data-part">
          <p class="data-part-title">Order's detail</p>
          <div class="data-divider"></div>
          <p>Date: ${begin}</p>
          <p>Service: ${service}</p>
        </div>
      </div>
      <div class="data-divider"></div>
      <div class="data-part data-amount">
        <p>Amount: ${price}</p>
      </div>
    </div>
  </body>
</html>`
}
export default pdfTemplate
