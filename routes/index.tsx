import {Handlers, PageProps} from "$fresh/server.ts";
import {Head} from "$fresh/src/runtime/head.ts";
import Preact from "preact";
import { microcmsClient } from "../lib/microcmsClient.ts";

export interface Post {
    contents: [{
        id: string;
        url: string;
        title: string;
        published_article: string;
    }];
}
export const handler: Handlers<Post> = {
    async GET(_req, ctx) {
        const articles = await microcmsClient.get<Post>({
            endpoint: "articles",
            queries: { limit: 99 },
        });
        if (!articles) {
            return new Response("Project not found", { status: 404 });
        }
        return ctx.render(articles);
    },
};
export default function Home({ data }: PageProps<Post>) {
    return (
        <div className="page">
            <Head>
                <title>Stead Profile</title>
            </Head>
            <section>
                {data.contents.map((content) => {
                    return (
                        <div key={content.id}>
                            <a href={content.url} alt={content.title}>
                                <p>{content.title}</p>
                                <p>{content.published_article}</p>
                            </a>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}
