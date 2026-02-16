export const ONLINE_RESUME_URL = '/resume.html'

export const contactSupportAreas = [
  {
    title: 'UX research and journey mapping',
    description:
      'Supporting research synthesis and mapping user journeys. Turning insights into clear, structured flows.',
  },
  {
    title: 'Wireframes and interface design',
    description: 'Creating clear layouts that balance usability and visual consistency.',
  },
  {
    title: 'Design system support',
    description: 'Documenting components, checking consistency, and improving scalability.',
  },
  {
    title: 'Frontend UX QA',
    description: 'Reviewing builds, identifying edge cases, and tightening interaction details.',
  },
]

export const projects = [
  {
    id: 'signal-room',
    title: 'Angkas App Redesign',
    category: 'Mobile UX Concept',
    chips: ['Concept', 'Solo', 'UX Design', 'Mobile'],
    year: '2022',
    summary: 'Independent redesign focused on faster booking and fewer interaction steps.',
    variant: 'insights',
    previewImageSrc: '/Angkas.png',
    href: '/projects/signal-room',
  },
  {
    id: 'motion-lab',
    title: 'KuryentePH Concept App',
    category: 'Category Placeholder',
    chips: ['Energy Monitoring', 'Concept', 'Mobile'],
    year: '2026',
    summary: 'Making electricity consumption easier to track and understand.',
    variant: 'motion',
    previewImageSrc: '/KuryentePH.png',
    href: '/projects/motion-lab',
  },
  {
    id: 'alliance-link',
    title: 'FAST Concept App',
    category: 'Category Placeholder',
    chips: ['Mobile', 'Concept App', 'Transportation'],
    year: '2025',
    summary: 'Mobile ticketing concept to reduce queues and improve commuter updates.',
    variant: 'partnership',
    previewImageSrc: '/Fast.png',
    href: '/projects/alliance-link',
  },
]

export const projectDetailContentByVariant = {
  insights: {
    heroLabel: 'Angkas Booking Flow Optimization',
    heroLead:
      'Identifying friction points in a time sensitive ride booking flow and reducing interaction cost without changing the core brand experience.',
    context: [
      { label: 'Role', value: 'UX Designer' },
      { label: 'Timeline', value: '2 Months' },
      { label: 'Scope', value: 'Booking flow usability optimization' },
    ],
    problemPoints: [
      'Slow transitions increased perceived waiting time during booking',
      'Route entry and voucher application were separated into multiple steps',
      'Excessive taps slowed down completion of urgent ride requests',
    ],
    solutionHighlights: [
      'Mapped and reduced total interactions required to book a ride',
      'Combined related actions such as route entry and voucher use',
      'Removed non essential transitions that added delay without value',
    ],
    processSteps: [
      {
        title: 'Heuristic Review',
        description:
          'Reviewed the existing app to identify friction points, unnecessary animations, and redundant steps in the booking flow.',
      },
      {
        title: 'Flow Mapping',
        description:
          'Documented every step from app launch to ride confirmation and quantified taps and screens to identify optimization opportunities.',
      },
      {
        title: 'Low Fidelity Testing',
        description:
          'Used wireframes and simple prototypes to validate faster task completion before moving to higher fidelity designs.',
      },
    ],
    outcomes: [
      { metric: 'Reduced', label: 'Number of taps from open to ride confirmation' },
      { metric: 'Faster', label: 'Perceived booking speed due to fewer transitions' },
      { metric: 'Clearer', label: 'User understanding of next steps during booking' },
    ],
    prototypeHref: '',
    prototypeLabel: 'View Interactive Prototype',
  },
  motion: {
    heroLabel: 'Angkas Motion Simplification',
    heroLead:
      'Reducing animation and transition overhead to make booking feel immediate and responsive in a high urgency context.',
    context: [
      { label: 'Role', value: 'UX Designer' },
      { label: 'Timeline', value: '2 Months' },
      { label: 'Scope', value: 'Motion reduction for booking flow' },
    ],
    problemPoints: [
      'Animations delayed access to critical booking actions',
      'Transitions added time without improving clarity or feedback',
      'Motion competed with speed expectations in urgent scenarios',
    ],
    solutionHighlights: [
      'Removed or shortened non essential animations',
      'Preserved motion only where it reinforced system feedback',
      'Prioritized instant state changes for booking actions',
    ],
    processSteps: [
      {
        title: 'Motion Audit',
        description:
          'Reviewed all transitions and animations in the booking flow to assess usefulness versus delay introduced.',
      },
      {
        title: 'Motion Reduction',
        description:
          'Simplified or removed animations that did not provide meaningful feedback or clarity to users.',
      },
      {
        title: 'Prototype Validation',
        description:
          'Tested revised motion behavior in interactive prototypes to confirm faster perceived performance.',
      },
    ],
    outcomes: [
      { metric: 'Lower', label: 'Perceived waiting time during booking' },
      { metric: 'Higher', label: 'Sense of responsiveness in core interactions' },
      { metric: 'Maintained', label: 'Brand familiarity despite reduced motion' },
    ],
    prototypeHref: '',
    prototypeLabel: 'View Interactive Prototype',
  },
  partnership: {
    heroLabel: 'Angkas Brand Consistent Redesign',
    heroLead:
      'Improving speed and usability while respecting existing brand, layout patterns, and user familiarity.',
    context: [
      { label: 'Role', value: 'UX Designer' },
      { label: 'Timeline', value: '2 Months' },
      { label: 'Scope', value: 'Brand-consistent booking flow redesign' },
    ],
    problemPoints: [
      'Performance issues risked being mistaken as design flaws',
      'Major visual changes could disrupt existing user trust',
      'Efficiency gains needed without a full visual overhaul',
    ],
    solutionHighlights: [
      'Retained existing color scheme and typography',
      'Focused changes on structure and interaction rather than visuals',
      'Optimized layout hierarchy to surface core actions faster',
    ],
    processSteps: [
      {
        title: 'Constraint Definition',
        description:
          'Established brand and UI elements that must remain unchanged to preserve familiarity.',
      },
      {
        title: 'Structural Redesign',
        description:
          'Reorganized screens and action placement to reduce effort while keeping the visual language intact.',
      },
      {
        title: 'Edge Case Review',
        description:
          'Checked scenarios such as invalid routes and voucher errors to ensure clarity without extra screens.',
      },
    ],
    outcomes: [
      { metric: 'Improved', label: 'Efficiency without altering brand identity' },
      { metric: 'Reduced', label: 'User effort for core booking tasks' },
      { metric: 'Balanced', label: 'Speed improvements with visual familiarity' },
    ],
    prototypeHref: '',
    prototypeLabel: 'View Interactive Prototype',
  },
}
