const axios = require("axios");
module.exports = {
  search: (req, res, next) => {
    console.log("We Here");
    const { banana } = req.body.params;
    console.log(banana);
    const dbInstance = req.app.get("db");
    dbInstance
      .get_products([`%${banana}%`])
      .then(resp => {
        console.log(resp);
        res.status(200).send(resp);
      })
      .catch(() => res.status(500).send());
  },
  filter: (req, res, next) => {
    const { fter, fText } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance
      .filter([fter, fText])
      .then(resp => {
        res.status(200).send(resp);
      })
      .catch(() => res.status(500).send());
  },
  sfilter: (req, res, next) => {
    const { fter, fText, sText } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance
      .sfilter([fter.filter, fText.filterText, sText.searchText])
      .then(resp => {
        res.status(200).send(resp);
      })
      .catch(() => res.status(500).send());
  },
  //   cartcard: (req, res, next) => {
  //     const {  } = req.body;
  //     const dbInstance = req.app.get("db");
  //     dbInstance.([]).then(=>{res.status(200).send()}).catch(() => res.status(500).send())
  //   },
  //   cartproduct: (req, res, next) => {
  //     const { product } = req.body;
  //     const dbInstance = req.app.get("db");
  //     dbInstance.([]).then(=>{res.status(200).send()}).catch(() => res.status(500).send())
  //   },
  //   dcartcard: (req, res, next) => {
  //     const { product } = req.body;
  //     const dbInstance = req.app.get("db");
  //     dbInstance.([]).then(=>{res.status(200).send()}).catch(() => res.status(500).send())
  //   },
  //   dcartproduct: (req, res, next) => {
  //     const { product } = req.body;
  //     const dbInstance = req.app.get("db");
  //     dbInstance.([]).then(=>{res.status(200).send()}).catch(() => res.status(500).send())
  //   },
  addmagic: (req, res, next) => {
    const { product, murl, currentPrice, currentInfo } = req.body;
    console.log(product.name.toLowerCase());
    const dbInstance = req.app.get("db");
    dbInstance
      .add_magic([
        1,
        2,
        product.name,
        product.setName,
        product.multiverseid,
        product.type,
        currentPrice,
        murl,
        currentInfo,
        product.name.toLowerCase()
      ])
      .then(resp => {
        res.status(200);
      });
  },
  addyugioh: (req, res, next) => {
    const { product, currentPrice, currentInfo, yurl } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance
      .add_yugioh([
        1,
        3,
        currentPrice,
        yurl,
        currentInfo,
        product.data.name,
        product.data.type,
        product.data.card_type,
        product.data.name.toLowerCase()
      ])
      .then(resp => {
        res.status(200).send();
      })
      .catch(() => res.status(500).send());
  },
  addproduct: (req, res, next) => {
    const { currentPrice, product, currentInfo, product_id } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance
      .add_product([1, 1, currentPrice, currentInfo, product_id])
      .then(resp => {
        res.status(200).send();
      })
      .catch(() => res.status(500).send());
  },
  rproduct: (req, res, next) => {
    const { product, type } = req.body;
    console.log(product);
    console.log(type);
    const dbInstance = req.app.get("db");
    dbInstance
      .remove_product([product, type])
      .then(resp => {
        res.status(200).send();
      })
      .catch(() => res.status(500).send());
  },

  inproduct: (req, res, next) => {
    const { product, type } = req.body;
    const dbInstance = req.app.get("db");
    console.log("inproduct hit", product, type);
    dbInstance
      .increase_product([product, type])
      .then(resp => {
        res.status(200).send();
      })
      .catch(() => res.status(500).send());
  },
  deproduct: (req, res, next) => {
    const { product, type } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance
      .decrease_product([product, type])
      .then(resp => {
        res.status(200).send();
      })
      .catch(() => res.status(500).send());
  },
  msearch: (req, res, next) => {
    const { banana } = req.body.params;
    console.log("Magic Data", banana);
    axios
      .get(`http://api.magicthegathering.io/v1/cards?name=${banana}`)
      .then(response => {
        console.log(response.data);
        res.status(200).send(response.data);
      });
  },
  ysearch: (req, res, next) => {
    const { banana } = req.body.params;
    axios
      .get(`http://yugiohprices.com/api/card_data/${banana}`)
      .then(response => {
        console.log("Yugioh Data", response.data);
        res.status(200).send(response.data);
      });
  },
  // mstockCheck: (req, res, next) => {
  //   const { product } = req.body;
  //   const dbInstance = req.app.get("db");
  //   dbInstance
  //     .find_product([product.multiverseid, "multiverseid"])
  //     .then(resp => {
  //       console.log(resp);
  //       res.status(200).send(resp);
  //     })
  //     .catch(() => res.status(500).send());
  // },
  // ystockCheck: (req, res, next) => {
  //   const { product } = req.body;
  //   const dbInstance = req.app.get("db");
  //   dbInstance
  //     .find_product([product.card_type, "card_type"])
  //     .then(resp => {
  //       console.log(resp);
  //       res.status(200).send(resp);
  //     })
  //     .catch(() => res.status(500).send());
  // },
  // pstockCheck: (req, res, next) => {
  //   const { product } = req.body;
  //   console.log;
  //   const dbInstance = req.app.get("db");
  //   dbInstance
  //     .find_product(product.product_id, "product_id")
  //     .then(resp => {
  //       res.status(200).send(resp);
  //     })
  //     .catch(() => res.status(500).send());
  // }
  cP: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.all_products().then(resp => {
      res.status(200).send(resp);
    });
  }
};
