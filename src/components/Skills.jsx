import { motion } from 'framer-motion'
import {
  SiDocker,
  SiElectron,
  SiFastapi,
  SiJavascript,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiSupabase,
} from 'react-icons/si'
import {
  TbAlertTriangle,
  TbBrandPowershell,
  TbBug,
  TbClipboardList,
  TbDeviceDesktop,
  TbKey,
  TbRadar2,
  TbUserShield,
} from 'react-icons/tb'
import { profile } from '../data/profile.js'
import { useSpotlight } from '../hooks/useSpotlight.js'
import { useTapSpin } from '../hooks/useTapSpin.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'

const SKILL_ICONS = {
  'Gestión de Riesgos TI': TbAlertTriangle,
  'RBAC / Control de Acceso': TbUserShield,
  'Auditoría y Logging': TbClipboardList,
  'OWASP: XSS y tokens de un solo uso': TbBug,
  'Gestión de Secretos (.env)': TbKey,
  'Monitoreo de Incidentes': TbRadar2,
  'JavaScript / Node.js': SiJavascript,
  Python: SiPython,
  Java: SiOpenjdk,
  Electron: SiElectron,
  FastAPI: SiFastapi,
  React: SiReact,
  PowerShell: TbBrandPowershell,
  Docker: SiDocker,
  'Supabase / PostgreSQL': SiSupabase,
  'Soporte Técnico (HW/SW/Redes)': TbDeviceDesktop,
}

function SkillTile({ skill, tone }) {
  const spotlight = useSpotlight()
  const spin = useTapSpin()
  const Icon = SKILL_ICONS[skill]

  return (
    <motion.li
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      onTap={spin.onTap}
      onKeyDown={(e) => e.key === 'Enter' && spin.onTap()}
      variants={fadeUpItem}
      className={`skill-tile skill-tile--${tone}`}
      data-cursor="hover"
      role="button"
      tabIndex={0}
    >
      <motion.div className="skill-tile-spin" animate={spin.animate} transition={spin.transition}>
        {Icon && <Icon className="skill-tile-icon" aria-hidden="true" />}
        <span className="skill-tile-label">{skill}</span>
      </motion.div>
    </motion.li>
  )
}

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
    >
      <motion.h2 variants={fadeUpItem} className="section-title glitch" data-text="Skills">
        Skills
      </motion.h2>
      <motion.div variants={staggerContainer(0.12)} className="skill-groups">
        {profile.skillGroups.map((group) => (
          <motion.div key={group.title} variants={fadeUpItem} className="skill-group">
            <h3 className={`skill-group-title skill-group-title--${group.tone}`}>{group.title}</h3>
            <motion.ul variants={staggerContainer(0.04)} className="skills-list">
              {group.skills.map((skill) => (
                <SkillTile key={skill} skill={skill} tone={group.tone} />
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
