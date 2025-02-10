import { FormContactType } from "@/app/(landing)/Schemas/ContactFormSchema";

interface EmailTemplateProps {
  name: string;
  contact: FormContactType["contact"];
  description: string;
}

export default function EmailLead({
  name,
  contact,
  description,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Encabezado */}
      <div
        style={{
          backgroundColor: "#3B82F6",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: "0",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Nuevo Lead ⚡
        </h1>
        <p
          style={{
            margin: "5px 0 0",
            fontSize: "14px",
            opacity: "0.8",
          }}
        >
          Un nuevo contacto espera tu atención
        </p>
      </div>

      {/* Contenido Principal */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9fafb",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h2
            style={{
              color: "#1f2937",
              fontSize: "18px",
              marginBottom: "15px",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
            }}
          >
            Detalles del Contacto
          </h2>

          {/* Detalles de Contacto */}
          <div>
            <p
              style={{
                margin: "10px 0",
                color: "#374151",
              }}
            >
              <strong>Nombre:</strong> {name}
            </p>
            <p
              style={{
                margin: "10px 0",
                color: "#374151",
              }}
            >
              <strong>Método de Contacto:</strong> {contact.contactType}
            </p>
            <p
              style={{
                margin: "10px 0",
                color: "#374151",
              }}
            >
              <strong>Contacto:</strong> {contact.contact}
            </p>

            {/* Descripción */}
            <p
              style={{
                margin: "10px 0",
                color: "#374151",
              }}
            >
              <strong>Descripción:</strong> {description}
            </p>
          </div>
        </div>

        {/* Mensaje Adicional */}
        <div
          style={{
            backgroundColor: "#f3f4f6",
            padding: "15px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              margin: "0",
            }}
          >
            Este lead requiere una respuesta rápida. Ponte en contacto lo antes
            posible para aprovechar la oportunidad.
          </p>
        </div>
      </div>

      {/* Pie de Página */}
      <div
        style={{
          backgroundColor: "#e5e7eb",
          padding: "10px",
          textAlign: "center",
          fontSize: "12px",
          color: "#6b7280",
        }}
      >
        <p style={{ margin: "0" }}>
          © {new Date().getFullYear()} Bit-A. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
