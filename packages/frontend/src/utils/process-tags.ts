export const processTags = (tags:string):string[] => {
  return tags.replaceAll(/[;\n\t]/gi, ",").split(",")
    .map((tag) => tag.trim())
    .filter((el) => el !== '');
};