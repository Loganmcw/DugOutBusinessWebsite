module.exports = {
  search: (req, res, next) => {
    const { searchText } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance
      .get_products([searchText])
      .then(res => {
        res.status(200).send(res);
      })
      .catch(() => res.status(500).send());
  },
  filter: (req, res, next) => {
    const { newfilter } = req.body;
    const dbInstance = req.app.get("db");
    if ((newFilter.length = 1)) {
      dbInstance
        .filter1([newFilter[0]])
        .then(res => {
          res.status(200).send(res);
        })
        .catch(() => res.status(500).send());
    } else if ((newFilter.length = 2)) {
      dbInstance
        .filter2([newFilter[0], newFilter[1]])
        .then(res => {
          res.status(200).send(res);
        })
        .catch(() => res.status(500).send());
    } else if ((newFilter.length = 3)) {
      dbInstance
        .filter3([newFilter[0], newFilter[1], newFilter[2]])
        .then(res => {
          res.status(200).send(res);
        })
        .catch(() => res.status(500).send());
    } else if ((newFilter.length = 4)) {
      dbInstance
        .filter4([newFilter[0], newFilter[1], newFilter[2], newFilter[3]])
        .then(res => {
          res.status(200).send(res);
        })
        .catch(() => res.status(500).send());
    } else if ((newFilter.length = 5)) {
      dbInstance
        .filter5([
          newFilter[0],
          newFilter[1],
          newFilter[2],
          newFilter[3],
          newFilter[4]
        ])
        .then(res => {
          res.status(200).send(res);
        })
        .catch(() => res.status(500).send());
    } else {
      dbInstance
        .filter6([
          newFilter[0],
          newFilter[1],
          newFilter[2],
          newFilter[3],
          newFilter[4],
          newFilter[5]
        ])
        .then(res => {
          res.status(200).send(res);
        })
        .catch(() => res.status(500).send());
    }
  },

  sfilter: (req, res, next) => {
    const { newFilter, searchText } = req.body;
    const dbInstance = req.app.get("db");
    if ((newFilter.length = 1)) {
      dbInstance
        .sfilter1([searchText, newFilter[0]])
        .then(res => {
          res.status(200).send(res);
        })
        .catch(() => res.status(500).send());
    } else if ((newFilter.length = 2)) {
      dbInstance
        .sfilter2([searchText, newFilter[0], newFilter[1]])
        .then(res => {
          res.status(200).send(res);
        })
        .catch(() => res.status(500).send());
    } else if ((newFilter.length = 3)) {
      dbInstance
        .sfilter3([searchText, newFilter[0], newFilter[1], newFilter[2]])
        .then(res => {
          res.status(200).send(res);
        })
        .catch(() => res.status(500).send());
    } else if ((newFilter.length = 4)) {
      dbInstance
        .sfilter4([
          searchText,
          newFilter[0],
          newFilter[1],
          newFilter[2],
          newFilter[3]
        ])
        .then(res => {
          res.status(200).send(res);
        })
        .catch(() => res.status(500).send());
    } else if ((newFilter.length = 5)) {
      dbInstance
        .sfilter5([
          searchText,
          newFilter[0],
          newFilter[1],
          newFilter[2],
          newFilter[3],
          newFilter[4]
        ])
        .then(res => {
          res.status(200).send(res);
        })
        .catch(() => res.status(500).send());
    } else {
      dbInstance
        .sfilter6([
          searchText,
          newFilter[0],
          newFilter[1],
          newFilter[2],
          newFilter[3],
          newFilter[4],
          newFilter[5]
        ])
        .then(res => {
          res.status(200).send(res);
        })
        .catch(() => res.status(500).send());
    }
  }
  //   cartcard: (req, res, next) => {
  //     const { product } = req.body;
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
  //   addmagic: (req, res, next) => {
  //     const { product, currentPrice, murl, ming, currentInfo } = req.body;
  //     const dbInstance = req.app.get("db");
  //     dbInstance.([]).then(=>{res.status(200).send()}).catch(() => res.status(500).send())
  //   },
  //   addyugioh: (req, res, next) => {
  //     const { product, currentPrice, currentInfo, ying, yurl } = req.body;
  //     const dbInstance = req.app.get("db");
  //     dbInstance.([]).then(=>{res.status(200).send()}).catch(() => res.status(500).send())
  //   },
  //   addproduct: (req, res, next) => {
  //     const { currentPrice, product, currentInfo } = req.body;
  //     const dbInstance = req.app.get("db");
  //     dbInstance.([]).then(=>{res.status(200).send()}).catch(() => res.status(500).send())
  //   },
  //   rmagic: (req, res, next) => {
  //     const { product } = req.body;
  //     const dbInstance = req.app.get("db");
  //     dbInstance.([]).then(=>{res.status(200).send()}).catch(() => res.status(500).send())
  //   },
  //   ryugioh: (req, res, next) => {
  //     const { product } = req.body;
  //     const dbInstance = req.app.get("db");
  //     dbInstance.([]).then(=>{res.status(200).send()}).catch(() => res.status(500).send())
  //   },
  //   rproduct: (req, res, next) => {
  //     const { product } = req.body;
  //     const dbInstance = req.app.get("db");
  //     dbInstance.([]).then(=>{res.status(200).send()}).catch(() => res.status(500).send())
  //   }
};
