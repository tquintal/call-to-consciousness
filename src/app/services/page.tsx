import { Layout, SmallerTitle, SubTitle, Title } from "../components/Elements";
import data from "../data/services.json";

type ServicesType = {
  title: string;
  description?: string;
  content: string[];
};

export default function Services() {
  const content: ServicesType[] = data;

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Title>Serviços</Title>
        {content.map((el, i) => (
          <div key={i} className="flex justify-between">
            <div>
              <SubTitle>{el.title}</SubTitle>
              <SmallerTitle>{el.description}</SmallerTitle>
              {el.content.map((el, i) => (
                <ul key={i}>
                  <li>- {el}</li>
                </ul>
              ))}
            </div>
            <div className="h-72 w-96 bg-slate-300" />
          </div>
        ))}
      </div>
    </Layout>
  );
}
