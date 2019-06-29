import chalk from "chalk";
import Item from "../server/items/item.model";
import User from "../server/users/user.model";
import Logger from "../server/utils/Logger";
const logger = new Logger("SeedData");

const SeedData = {
  async reload() {
    logger.info("reload");
    try {
      const items = await Item.find({});
      if (items.length === 0) {
        logger.info("No items in the database creating sample data...");
        const newItems = [
          { name: "Paper clip", value: 0.1 },
          { name: "Colorful pen", value: 1.2 },
          { name: "Notebook", value: 2.5 },
          { name: "Soft eraser", value: 0.5 },
          { name: "Table lamp", value: 5.1 },
        ];
        await Item.insertMany(newItems);
        logger.info(`${newItems.length} item(s) successfuly created!`);
      } else {
        logger.warn("Database already initiated, skipping populating script");
      }
    } catch (error) {
      logger.error(error);
    }
  },

  async addSuperUser() {
    if (!process.env.SUPERUSER || !process.env.SUPERPASS) {
      logger.error("you need a .env file with SUPERUSER and SUPERPASS set to create initial user");
      return;
    }
    const users = await User.find({ email: process.env.SUPERUSER });
    if (users.length !== 0) {
      logger.warn("SuperUser existed skipping create");
      return;
    }
    const user = new User();
    user.email = process.env.SUPERUSER;
    user.setPassword(process.env.SUPERPASS);
    await user.save();
    logger.info("SuperUser successfuly created!");
  },
};

export default SeedData;
