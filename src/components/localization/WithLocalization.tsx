import { translations } from "@/shared/locales";
import { GenericObject } from "@/shared/types";
import { setCurrentLocaleCode, trans } from "@mongez/localization";
import { Metadata } from "next";

type WithLocaleProps = {
  searchParams: GenericObject;
  params: {
    lang: string;
    [key: string]: any;
  };
};

export function withLocalization(
  Component: React.ComponentType<WithLocaleProps>
) {
  return function WithLocaleComponent(props: WithLocaleProps) {
    translations();
    setCurrentLocaleCode(props.params.lang);
    return (
      <>
        <Component {...props} />
      </>
    );
  };
}

export type MetadataType = Metadata & {
  appendAppName?: boolean;
  image?: string;
};

export function withLocalizationMetadata(
  callback: (props: any) => MetadataType | Promise<MetadataType>
) {
  return async function metadata(props: any) {
    translations();
    setCurrentLocaleCode(props.params.lang);

    const { appendAppName = true, ...result } = await callback(props);

    if (!result.applicationName) {
      result.applicationName = trans("appName");
    }

    if (appendAppName && result.title) {
      result.title += ` | ` + result.applicationName;
    }

    // if (!result.openGraph) {
    //   result.openGraph = {
    //     title: result.title as string,
    //     description: result.description as string,
    //   };
    // }

    // if (image && !result.openGraph?.images) {
    //   result.openGraph.images = [
    //     {
    //       url: image,
    //     },
    //   ];
    // }

    // if (!result.twitter) {
    //   result.twitter = {
    //     title: result.title as string,
    //     description: result.description as string,
    //   };
    // }

    // if (image && !result.twitter?.images) {
    //   result.twitter.images = [
    //     {
    //       url: image,
    //     },
    //   ];
    // }

    return result;
  };
}
