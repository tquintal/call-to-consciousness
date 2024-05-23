import { getMonthYear } from "@/utils/utils";

export const CookiesPolicy = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Política de Cookies 🍪</h1>
      <p className="mb-4">Última atualização: {getMonthYear()}</p>
      <h2 className="text-xl font-semibold mb-2">O que são cookies?</h2>
      <p className="mb-4">
        Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando visita um website. São amplamente
        utilizados para fazer com que os websites funcionem, ou funcionem de forma mais eficiente, bem como para fornecer informações
        aos proprietários do site.
      </p>
      <h2 className="text-xl font-semibold mb-2">Utilização de Cookies neste Website</h2>
      <p className="mb-4">
        Este website não utiliza cookies. Não armazenamos qualquer tipo de informação no seu dispositivo e não rastreamos o seu
        comportamento enquanto navega neste site.
      </p>
      <h2 className="text-xl font-semibold mb-2">Cookies de Terceiros</h2>
      <p className="mb-4">
        Como não utilizamos cookies, também não permitimos cookies de terceiros neste site. Isto inclui cookies de análise, publicidade
        ou redes sociais.
      </p>
      <h2 className="text-xl font-semibold mb-2">Gerir Cookies</h2>
      <p className="mb-4">
        Uma vez que este website não utiliza cookies, não há necessidade de gerir configurações de cookies aqui. No entanto, pode
        ajustar as configurações de cookies para outros websites através das configurações do seu navegador.
      </p>
      <h2 className="text-xl font-semibold mb-2">Alterações a esta Política de Cookies</h2>
      <p className="mb-4">
        A política de cookies poderá ser atualizada ocasionalmente. Recomendo que reveja esta página periodicamente para se manter
        informado sobre como utiliza cookies.
      </p>
      <h2 className="text-xl font-semibold mb-2">Contacto</h2>
      <p>Se tiver alguma questão sobre a política de cookies, pode contactar-nos em call.to.consciousness@gmail.com.</p>
    </>
  );
};

export const PrivacyPolicy = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Política de Privacidade 🕵️</h1>
      <p className="mb-4">Última atualização: {getMonthYear()}</p>
      <h2 className="text-xl font-semibold mb-2">Recolha de Informação</h2>
      <p className="mb-4">
        Este website não recolhe qualquer tipo de informação pessoal dos visitantes. Não utiliza cookies, armazenamento local, sessões
        ou cache. Isto significa que não armazena nenhuma informação no seu dispositivo e não monitoriza o seu comportamento enquanto
        navega.
      </p>
      <h2 className="text-xl font-semibold mb-2">Uso de Informação</h2>
      <p className="mb-4">Não recolhe nenhuma informação pessoal, não utiliza nem partilha qualquer dado com terceiros.</p>
      <h2 className="text-xl font-semibold mb-2">Segurança</h2>
      <p className="mb-4">
        Embora não recolha dados pessoais, estou comprometida em garantir que a sua experiência neste website é segura. Implemento
        medidas técnicas para proteger este site contra acesso não autorizado, alteração, divulgação ou destruição.
      </p>
      <h2 className="text-xl font-semibold mb-2">Alterações a esta Política de Privacidade</h2>
      <p className="mb-4">
        Poderei atualizar a política de privacidade ocasionalmente. Recomendo que reveja esta página periodicamente para se manter
        informado sobre como protejo a sua informação.
      </p>
      <h2 className="text-xl font-semibold mb-2">Contacto</h2>
      <p>Se tiver alguma questão sobre a política de privacidade, pode contactar em call.to.consciousness@gmail.com.</p>
    </>
  );
};
