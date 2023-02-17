import {Handlers, PageProps} from "$fresh/server.ts";
import {Head} from "$fresh/src/runtime/head.ts";
import {tw} from "twind";
import {microcmsClient} from "../lib/microcmsClient.ts";
import dayjs from "dayjs";

export interface Post {
    contents: [{
        id: string;
        url: string;
        title: string;
        published_article?: string;
    }];
}

export const handler: Handlers<Post> = {
    async GET(_req, ctx) {
        const articles = await microcmsClient.get<Post>({
            endpoint: "articles",
            queries: {limit: 99},
        });
        if (!articles) {
            return new Response("Response not found", {status: 404});
        }
        return ctx.render(articles);
    },
};
export default function Home({data}: PageProps<Post>) {
    return (
        <div class={tw("h-screen bg-yellow-200")}>
            <Head>
                <title>Stead Profile</title>
            </Head>
            <div
                class={tw(
                    "max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col"
                )}>
                <h1 class={tw("font-extrabold text-5xl text-gray-800 flex justify-center")}>Stead Profile</h1>
                <section class={tw("m-8")}>
                    {data.contents.map((content) => {
                        return (
                            <div class={tw("p-4")}key={content.id}>
                                <a href={content.url} alt={content.title}>
                                    <p>{content.title}</p>
                                    <time
                                        className={tw("text-gray-500 text-sm")}
                                        dateTime={content.published_article}
                                    >
                                        {dayjs(content.published_article).format("YYYY-MM-DD HH:mm:ss")}
                                    </time>
                                </a>
                            </div>
                        )
                    })}
                </section>
            </div>
        </div>
    )
}
