import { getMonthYear } from "@/utils/utils";

export const CookiesPolicy = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Política de Cookies 🍪</h1>
      <p className="mb-4">Última atualização: {getMonthYear()}</p>
      <h2 className="text-xl font-semibold mb-2">O que são cookies?</h2>
      <p className="mb-4">
        Cookies são pequenos arquivos de texto que são armazenados no dispositivo do utilizador quando visita um website. São
        amplamente utilizados para fazer com que os websites funcionem, ou funcionem de forma mais eficiente, bem como para fornecer
        informações aos proprietários do site.
      </p>
      <h2 className="text-xl font-semibold mb-2">Utilização de Cookies neste Website</h2>
      <p className="mb-2">
        Este website utiliza cookies de sessão através da biblioteca NextAuth.js exclusivamente para fins administrativos. Estes
        cookies são necessários para o funcionamento do painel de administração e incluem:
      </p>
      <p className="ml-4">
        <span className="font-semibold">- next-auth.callback-url: </span>Utilizado para redirecionamento após a autenticação.
      </p>
      <p className="ml-4">
        <span className="font-semibold">- next-auth.csrf-token: </span>Utilizado para proteger contra ataques CSRF.
      </p>
      <p className="mb-4 ml-4">
        <span className="font-semibold">- next-auth.session-token: </span>Utilizado para manter a sessão de utilizador autenticado.
      </p>
      <h2 className="text-xl font-semibold mb-2">Cookies de Terceiros</h2>
      <p className="mb-4">
        Além dos cookies necessários para administração, este website não utiliza cookies de terceiros, tais como cookies de análise,
        publicidade ou redes sociais.
      </p>
      <h2 className="text-xl font-semibold mb-2">Gerir Cookies</h2>
      <p className="mb-4">
        Os utilizadores podem gerir as configurações de cookies através das configurações do navegador. No entanto, desativar os
        cookies necessários pode afetar o funcionamento do painel de administração.
      </p>
      <h2 className="text-xl font-semibold mb-2">Alterações a esta Política de Cookies</h2>
      <p className="mb-4">
        A política de cookies poderá ser atualizada ocasionalmente. Recomenda-se que os utilizadores revejam esta página periodicamente
        para se manterem informados sobre como utilizamos cookies.
      </p>
      <h2 className="text-xl font-semibold mb-2">Contacto</h2>
      <p>
        Se tiver alguma questão sobre a política de cookies, pode contactar-nos em{" "}
        <a href="mailto:call.to.consciousness@gmail.com" className="text-blue-500">
          call.to.consciousness@gmail.com
        </a>
      </p>
    </>
  );
};

export const PrivacyPolicy = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Política de Privacidade 🕵️</h1>
      <p className="mb-4">Última atualização: {getMonthYear()}</p>
      <h2 className="text-xl font-semibold mb-2">Recolha de Informação</h2>
      <p className="mb-2">
        Este website não recolhe qualquer tipo de informação pessoal dos visitantes. Utiliza cookies de sessão e armazenamento local
        exclusivamente para fins administrativos. Isto inclui:
      </p>
      <p className="ml-4">
        <span className="font-semibold">- ally-supports-cache: </span>Utilizado para melhorar a performance do website.
      </p>
      <p className="mb-4 ml-4">
        <span className="font-semibold">- nextauth.message: </span>Utilizado para mensagens relacionadas com a autenticação.
      </p>
      <h2 className="text-xl font-semibold mb-2">Uso de Informação</h2>
      <p className="mb-4">
        A informação recolhida é utilizada exclusivamente para fins de autenticação do administrador e não é partilhada com terceiros.
      </p>
      <h2 className="text-xl font-semibold mb-2">Segurança</h2>
      <p className="mb-4">
        Estamos comprometidos em garantir que a experiência no nosso website é segura. Implementamos medidas técnicas para proteger
        este site contra acesso não autorizado, alteração, divulgação ou destruição.
      </p>
      <h2 className="text-xl font-semibold mb-2">Alterações a esta Política de Privacidade</h2>
      <p className="mb-4">
        Poderemos atualizar a política de privacidade ocasionalmente. Recomenda-se que os utilizadores revejam esta página
        periodicamente para se manterem informados sobre como protegemos a sua informação.
      </p>
      <h2 className="text-xl font-semibold mb-2">Contacto</h2>
      <p>
        Se tiver alguma questão sobre a política de privacidade, pode contactar-nos em{" "}
        <a href="mailto:call.to.consciousness@gmail.com" className="text-blue-500">
          call.to.consciousness@gmail.com
        </a>
      </p>
    </>
  );
};
