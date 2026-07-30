import { Document, Page, Text, View, StyleSheet, Link, Image } from '@react-pdf/renderer'
import { profile, experience, education, certifications } from '../data/profile.js'

const ACCENT = '#a8790a'
const MUTED = '#555555'
const BORDER = '#dddddd'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#111111',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logo: {
    width: 30,
    height: 30,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  role: {
    fontSize: 12,
    color: ACCENT,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
    fontSize: 9,
    color: MUTED,
  },
  bio: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 16,
    color: '#222222',
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: ACCENT,
    marginBottom: 8,
    borderBottom: `1pt solid ${BORDER}`,
    paddingBottom: 4,
  },
  entry: {
    marginBottom: 10,
  },
  entryTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entryTitle: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
  },
  entryPeriod: {
    fontSize: 9,
    color: MUTED,
  },
  entryOrg: {
    fontSize: 9.5,
    color: '#333333',
    marginBottom: 3,
  },
  entryDesc: {
    fontSize: 9.5,
    lineHeight: 1.4,
    color: '#333333',
  },
  section: {
    marginBottom: 16,
  },
  certGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  certItem: {
    width: '50%',
    fontSize: 9,
    marginBottom: 6,
    paddingRight: 8,
  },
  certName: {
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
  },
  certMeta: {
    color: MUTED,
  },
  skillsRow: {
    marginBottom: 4,
    fontSize: 9.5,
  },
  skillsGroup: {
    fontFamily: 'Helvetica-Bold',
    color: ACCENT,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 40,
    right: 40,
    fontSize: 8,
    color: MUTED,
    textAlign: 'center',
  },
})

export default function ResumeDocument() {
  return (
    <Document title={`CV - ${profile.name}`} author={profile.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.role}>{profile.role}</Text>
          </View>
          <Image src="/rlases-brand-kit/png/06-icono-negro-sobre-blanco@2x.png" style={styles.logo} />
        </View>
        <View style={styles.contactRow}>
          <Text>{profile.location}</Text>
          <Text>{profile.links.email}</Text>
          <Link src={profile.links.github} style={{ color: MUTED }}>
            {profile.links.github.replace('https://', '')}
          </Link>
          <Link src={profile.links.linkedin} style={{ color: MUTED }}>
            {profile.links.linkedin.replace('https://', '')}
          </Link>
        </View>

        <Text style={styles.bio}>{profile.bio}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiencia</Text>
          {experience.map((item) => (
            <View key={item.role} style={styles.entry}>
              <View style={styles.entryTitleRow}>
                <Text style={styles.entryTitle}>{item.role}</Text>
                <Text style={styles.entryPeriod}>{item.period}</Text>
              </View>
              <Text style={styles.entryOrg}>{item.org}</Text>
              <Text style={styles.entryDesc}>{item.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Educación</Text>
          {education.map((item) => (
            <View key={item.degree} style={styles.entry}>
              <View style={styles.entryTitleRow}>
                <Text style={styles.entryTitle}>{item.degree}</Text>
                <Text style={styles.entryPeriod}>{item.period}</Text>
              </View>
              <Text style={styles.entryOrg}>{item.school}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {profile.skillGroups.map((group) => (
            <Text key={group.title} style={styles.skillsRow}>
              <Text style={styles.skillsGroup}>{group.title}: </Text>
              {group.skills.join(' · ')}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certificaciones</Text>
          <View style={styles.certGrid}>
            {certifications.map((cert) => (
              <View key={cert.name} style={styles.certItem}>
                <Text style={styles.certName}>{cert.name}</Text>
                <Text style={styles.certMeta}>
                  {cert.issuer} · {cert.date}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer}>
          Generado desde {profile.links.github.replace('https://github.com/', 'github.com/')} — rlases.dev
        </Text>
      </Page>
    </Document>
  )
}
