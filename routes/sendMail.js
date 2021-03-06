const nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eventakss2006@gmail.com",
    pass: "Akss2006",
  },
});

module.exports.sendResetEmail = async (email, token) => {
  // change first part to your domain
  var url = "https://voting-portal-akss.herokuapp.com/accountRoutes/reset-password?token=" + token;

  await smtpTransport.sendMail({
    from: "ankitkumarsingh18hc@student.mes.ac.in",
    to: email,
    subject: "RESET YOUR PASSWORD",
    text: `Click on this link to reset your password ${url}`,
    html: `<tbody>
    <tr
      style="
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        box-sizing: border-box;
        font-size: 14px;
        margin: 0;
      "
    >
      <td
        style="
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          box-sizing: border-box;
          font-size: 14px;
          vertical-align: top;
          margin: 0;
        "
        valign="top"
      ></td>
      <td
        class="container"
        width="600"
        style="
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          box-sizing: border-box;
          font-size: 14px;
          display: block !important;
          max-width: 600px !important;
          clear: both !important;
          margin: 0 auto;
        "
        valign="top"
      >
        <div
          class="content"
          style="
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            box-sizing: border-box;
            font-size: 14px;
            max-width: 600px;
            display: block;
            margin: 0 auto;
            padding: 20px;
          "
        >
          <table
            class="main"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            itemprop="action"
            itemscope=""
            itemtype="http://schema.org/ConfirmAction"
            style="
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              box-sizing: border-box;
              font-size: 14px;
              border-radius: 3px;
              margin: 0;
              border: none;
            "
          >
            <tbody>
              <tr
                style="
                  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                  box-sizing: border-box;
                  font-size: 14px;
                  margin: 0;
                "
              >
                <td
                  class="content-wrap"
                  style="
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    box-sizing: border-box;
                    font-size: 14px;
                    vertical-align: top;
                    margin: 0;
                    padding: 30px;
                    border: 3px solid #67a8e4;
                    border-radius: 7px;
                    background-color: #fff;
                  "
                  valign="top"
                >
                  <meta
                    itemprop="name"
                    content="Confirm Email"
                    style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      box-sizing: border-box;
                      font-size: 14px;
                      margin: 0;
                    "
                  />
                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      box-sizing: border-box;
                      font-size: 14px;
                      margin: 0;
                    "
                  >
                    <tbody>
                      <tr
                        style="
                          font-family: 'Helvetica Neue', Helvetica, Arial,
                            sans-serif;
                          box-sizing: border-box;
                          font-size: 14px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block"
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            vertical-align: top;
                            margin: 0;
                            padding: 0 0 20px;
                          "
                          valign="top"
                        >
                          Please reset your password by clicking the button given
                          below.
                        </td>
                      </tr>
                      <tr
                        style="
                          font-family: 'Helvetica Neue', Helvetica, Arial,
                            sans-serif;
                          box-sizing: border-box;
                          font-size: 14px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block"
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            vertical-align: top;
                            margin: 0;
                            padding: 0 0 20px;
                          "
                          valign="top"
                        >
                          The link will be expired in next 10 minutes so consider
                          resetting your password under the given time period.
                        </td>
                      </tr>
                      <tr
                        style="
                          font-family: 'Helvetica Neue', Helvetica, Arial,
                            sans-serif;
                          box-sizing: border-box;
                          font-size: 14px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block"
                          itemprop="handler"
                          itemscope=""
                          itemtype="http://schema.org/HttpActionHandler"
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            vertical-align: top;
                            margin: 0;
                            padding: 0 0 20px;
                          "
                          valign="top"
                        >
                          <a
                            href="${url}"
                            class="btn-primary"
                            itemprop="url"
                            style="
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              color: #fff;
                              text-decoration: none;
                              line-height: 2em;
                              font-weight: bold;
                              text-align: center;
                              cursor: pointer;
                              display: inline-block;
                              border-radius: 5px;
                              text-transform: capitalize;
                              background-color: #f06292;
                              margin: 0;
                              border-color: #f06292;
                              border-style: solid;
                              border-width: 8px 16px;
                            "
                          >
                            Reset password</a
                          >
                        </td>
                      </tr>
                      <tr
                        style="
                          font-family: 'Helvetica Neue', Helvetica, Arial,
                            sans-serif;
                          box-sizing: border-box;
                          font-size: 14px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block"
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            vertical-align: top;
                            margin: 0;
                            padding: 0 0 20px;
                          "
                          valign="top"
                        >
                          <b>AKSS</b>
                          <p>Support Team</p>
                        </td>
                      </tr>
  
                      <tr
                        style="
                          font-family: 'Helvetica Neue', Helvetica, Arial,
                            sans-serif;
                          box-sizing: border-box;
                          font-size: 14px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block"
                          style="
                            text-align: center;
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            vertical-align: top;
                            margin: 0;
                            padding: 0;
                          "
                          valign="top"
                        >
                          &copy; 2021 akss
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  </tbody>
  `,
  });
};