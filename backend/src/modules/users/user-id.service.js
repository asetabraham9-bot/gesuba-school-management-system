import Counter from "./counter.model.js";
import {
  USER_ID_PREFIXES,
  USER_ROLES,
} from "./user.constants.js";

const generateUserId = async (role) => {
  if (!Object.values(USER_ROLES).includes(role)) {
    throw new Error(`Invalid user role: ${role}`);
  }

  const prefix = USER_ID_PREFIXES[role];

  if (!prefix) {
    throw new Error(`No ID prefix configured for role: ${role}`);
  }

  const counter = await Counter.findOneAndUpdate(
    { role },
    {
      $inc: {
        sequence: 1,
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  );

  const sequenceNumber = String(counter.sequence).padStart(4, "0");

  return `${prefix}${sequenceNumber}`;
};

export default generateUserId;