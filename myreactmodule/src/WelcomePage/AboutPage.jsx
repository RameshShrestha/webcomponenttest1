import { Title, Text, Link } from "@ui5/webcomponents-react";

function AboutPage() {
    return <div style={{ margin: "10px", color: "var(--sapTextColor)" }}>
        <Title>About Page</Title>
        <Text>
            This web application is developed as Practice of React application with Web components,
            Express as Node Server and
            Mongo DB has been used as Database.<br/><br/>
            Code base from Github links of other users have been used for initial setup for socket io.
            <br/> Special thanks to them.
            <br/>
            This application is continuesly developed as learning purpose, so if any features are not working as expected, please provide with the feedback from the contact page

        </Text>
        <h5>Platform / Technology / Library </h5>
        <ul >
            <li>SAP Webcomponents <Link>https://sap.github.io/ui5-webcomponents-react/</Link></li>
            <li>React JS <Link>https://react.dev/reference/react </Link></li>
            <li>Mongo DB <Link>https://www.mongodb.com/cloud/atlas/register </Link></li>
            <li>Node JS <Link> https://nodejs.org/docs/latest/api/</Link></li>
            <li>Express JS <Link>https://expressjs.com/ </Link> </li>
            <li>Socket.io <Link>https://socket.io/docs/v4/ </Link></li>
            <li>Open Layer Map <Link>https://openlayers.org/en/latest/apidoc/ </Link></li>
            <li>Open Weather<Link> https://openweathermap.org/</Link></li>
            <li>Dummy JSON API<Link>https://dummyjson.com/ </Link></li>
            <li>Simple Maps <Link> https://simplemaps.com/data</Link></li>
            <li>Rapid API <Link>https://rapidapi.com/hub</Link></li>
            <li>Render.com<Link>https://render.com/</Link></li>
            <li>Picsum Photos<Link>https://picsum.photos/v2/list</Link></li>
        </ul>

    </div>
} export default AboutPage; 