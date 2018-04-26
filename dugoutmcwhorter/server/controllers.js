const axios = require("axios");
module.exports = {
  search: (req, res, next) => {
    const { banana } = req.body.params;
    console.log("Text Check: ", banana);
    const dbInstance = req.app.get("db");
    dbInstance.get_products([`%${banana}%`]).then(resp => {
      console.log(resp);
      res.status(200).send(resp);
    }).catch(() => res.status(500).send());
  },
  filter: (req, res, next) => {
    const { fter, fText } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance.filter([fter, fText]).then(resp => {
      res.status(200).send(resp);
    }).catch(() => res.status(500).send());
  },
  sfilter: (req, res, next) => {
    const { fter, fText, sText } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance.sfilter([fter.filter, fText.filterText, sText.searchText]).then(resp => {
      res.status(200).send(resp);
    }).catch(() => res.status(500).send());
  },
  cartadd: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.cartadd([req.params.card, req.params.user, 1]).then(resp => {
      res.status(200).send();
    }).catch(() => res.status(500).send());
  },
  cartremove: (req, res, next) => {
    console.log("Remove Attempt");
    console.log(req.params.card, req.params.user)
    const dbInstance = req.app.get("db");
    dbInstance.cartremove([req.params.user, req.params.card]).then(resp => {
      console.log("Remove Successful")
      res.status(200).send();
    }).catch(() => res.status(500).send());
  },
  addmagic: (req, res, next) => {
    const { product, murl, currentPrice, currentInfo } = req.body;
    console.log(product.name.toLowerCase());
    const dbInstance = req.app.get("db");
    dbInstance.add_magic([
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
    ]).then(resp => {
      res.status(200);
    });
  },
  addyugioh: (req, res, next) => {
    const { product, currentPrice, currentInfo, yurl } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance.add_yugioh([
      1,
      3,
      currentPrice,
      yurl,
      currentInfo,
      product.name,
      product.type,
      product.card_type,
      product.name.toLowerCase()
    ]).then(resp => {
      res.status(200).send();
    }).catch(() => res.status(500).send());
  },
  addproduct: (req, res, next) => {
    const { currentPrice, product, currentInfo, product_id } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance.add_product([1, 1, currentPrice, currentInfo, product_id]).then(resp => {
      res.status(200).send();
    }).catch(() => res.status(500).send());
  },
  rmagic: (req, res, next) => {
    console.log("Remove Magic Console", req.params.id);
    const dbInstance = req.app.get("db");
    dbInstance.remove_magic([req.params.id])
  },
  ryugioh: (req, res, next) => {
    console.log("Remove Yu-Gi-Oh Console", req.params.id);
    const dbInstance = req.app.get("db");
    dbInstance.remove_yugioh([req.params.id])
  },
  rproduct: (req, res, next) => {
    console.log("Remove Product Console", req.params.id);
    const dbInstance = req.app.get("db");
    dbInstance.remove_product([req.params.id])
  },

  inmagic: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.ic_magic([req.body.product]).then(resp => {
      res.status(200).send();
    }).catch(() => res.status(500).send());
  },

  inyugioh: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.ic_yugioh([req.body.product]).then(resp => {
      res.status(200).send();
    }).catch(() => res.status(500).send());
  },

  inproduct: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.ic_product([req.body.product]).then(resp => {
      res.status(200).send();
    }).catch(() => res.status(500).send());
  },
  demagic: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.demagic([req.body.product]).then(resp => {
      res.status(200).send();
    }).catch(() => res.status(500).send());
  },

  deyugioh: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.deyugioh([req.body.product]).then(resp => {
      res.status(200).send();
    }).catch(() => res.status(500).send());
  },
  deproduct: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.deproduct([req.body.product]).then(resp => {
      res.status(200).send();
    }).catch(() => res.status(500).send());
  },
  msearch: (req, res, next) => {
    axios.get(`http://api.magicthegathering.io/v1/cards?name=${req.params.id}`).then(response => {
      res.status(200).send(response.data);
    });
  },
  ysearch: (req, res, next) => {
    axios.get(`http://yugiohprices.com/api/card_data/${req.params.id}`).then(response => {
      res.status(200).send(response.data);
    });
  },
  mstockCheck: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.mstock([req.params.id]).then(resp => {
      console.log(resp);
      res.status(200).send(resp.data);
    }).catch(() => res.status(500).send());
  },
  ystockCheck: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.ystock([req.params.id]).then(resp => {
      res.status(200).send(resp);
    }).catch(() => res.status(500).send());
  },
  pstockCheck: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.pstock([req.params.id]).then(resp => {
      res.status(200).send(resp);
    }).catch(() => res.status(500).send());
  },
  cP: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.all_products().then(resp => {
      res.status(200).send(resp);
    });
  },
  cartdecrease: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.cartdecrease([req.params.card, req.params.user]).then(resp => {
      res.status(200).send();
    });
  },
  cartincrease: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance.cartincrease([req.params.card, req.params.user]).then(resp => {
      res.status(200).send();
    });
  },
  checkCart: (req, res, next) => {
    console.log("Check Hit The Function", req.params.id, req.params.user);
    const dbInstance = req.app.get("db");
    dbInstance.checkCart([req.params.user, req.params.id]).then(resp => {
      res.status(200).send(resp);
      console.log("Check Sent", resp);
    });
  },
  wishlist: (req, res, next) => {
    console.log("Hit the Wishlist Request Function", req.params.id);
    const dbInstance = req.app.get("db");
    dbInstance.wishlist([req.params.id]).then(resp => {
      console.log("Wishlist Reply", resp)
      res.status(200).send(resp)
    })
  }
};
