import Contentstack from "contentstack";

const { REACT_APP_API_KEY } = process.env;
const { REACT_APP_DELIVERY_TOKEN } = process.env;
const { REACT_APP_ENVIROMENT_NAME } = process.env;

const Stack = Contentstack.Stack({
  api_key: REACT_APP_API_KEY,
  delivery_token: REACT_APP_DELIVERY_TOKEN,
  environment: REACT_APP_ENVIROMENT_NAME,
  region: Contentstack.Region.US,
});

Stack.setHost('cdn.contentstack.io');

export const getEntries = async (contentTypeUid, entryUid, locale) => {
    try {
        const entry = Stack.ContentType(contentTypeUid).Entry(entryUid).language(locale).addParam('include_metadata', 'true');
        const result = await entry.toJSON().fetch();
        // console.log('result', result);
        // console.log(Object.values(result.image._metadata.extensions)[0][0].hotstops)
        return result;
    } catch (error) {
      return null;
    }
  };