import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Img,
  Hr,
} from '@react-email/components';

export const SecretSantaEmail = ({
  recipientName,
  organizerName,
  gameName,
  gifteeName,
  budget,
  eventDate,
}) => {
  return (
    <Html>
      <Head />
      <Preview>¡Tu asignación de Secret Santa ha llegado! 🎁</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={title}>🎅 Secret Santa</Heading>
          </Section>
          
          <Section style={content}>
            <Text style={greeting}>¡Hola {recipientName}!</Text>
            <Text style={paragraph}>
              Has sido invitado al intercambio <strong>{gameName}</strong> organizado por {organizerName}.
            </Text>
            
            <Section style={assignmentBox}>
              <Text style={assignmentLabel}>Te tocó regalar a:</Text>
              <Heading style={assignmentName}>{gifteeName}</Heading>
            </Section>
            
            <Section style={details}>
              <Text style={detailText}>📅 <strong>Fecha:</strong> {eventDate}</Text>
              {budget && <Text style={detailText}>💰 <strong>Presupuesto:</strong> ${budget}</Text>}
            </Section>
            
            <Hr style={divider} />
            
            <Text style={footer}>
              ¡Shhh! 🤫 Recuerda mantenerlo en secreto hasta el día del intercambio.
            </Text>
            <Text style={footer}>
              Generado con ❤️ por Secret Santa App
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#D32F2F',
  padding: '32px',
  borderRadius: '12px 12px 0 0',
  textAlign: 'center',
};

const title = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
  textTransform: 'uppercase',
  letterSpacing: '2px',
};

const content = {
  padding: '32px',
};

const greeting = {
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
};

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
  marginBottom: '32px',
};

const assignmentBox = {
  backgroundColor: '#fdf4f4',
  border: '2px dashed #D32F2F',
  borderRadius: '12px',
  padding: '24px',
  textAlign: 'center',
  marginBottom: '32px',
};

const assignmentLabel = {
  fontSize: '16px',
  color: '#D32F2F',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontWeight: '600',
  marginBottom: '8px',
};

const assignmentName = {
  fontSize: '36px',
  color: '#1B5E20',
  fontWeight: 'bold',
  margin: '0',
};

const details = {
  marginBottom: '32px',
};

const detailText = {
  fontSize: '16px',
  color: '#484848',
  margin: '8px 0',
};

const divider = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  textAlign: 'center',
  marginTop: '12px',
};

export default SecretSantaEmail;
