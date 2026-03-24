import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Settings, User, Bell } from 'lucide-react';
import { Drawer } from './Drawer';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import { Select } from '../Select';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A slide-in panel anchored to any screen edge. Supports left, right, top, and bottom placements with four size options. Includes focus trap, scroll lock, and overlay click/Esc close.',
      },
    },
  },
  argTypes: {
    placement: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { placement: 'right', size: 'md', title: 'Drawer title' },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
        <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Drawer.Body>
            <p style={{ margin: 0, fontSize: '14px', color: '#6B7694', lineHeight: 1.7 }}>
              This is the drawer body. It scrolls independently from the rest of the page. Add
              any content here — forms, settings, detail views, and more.
            </p>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>Save</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const [open, setOpen] = useState<'left' | 'right' | null>(null);
    return (
      <>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button variant="secondary" size="sm" onClick={() => setOpen('left')}>
            From left
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setOpen('right')}>
            From right
          </Button>
        </div>
        <Drawer isOpen={open === 'left'} onClose={() => setOpen(null)} placement="left" title="Left drawer" size="sm">
          <Drawer.Body>
            <p style={{ margin: 0, fontSize: 14, color: '#6b7694' }}>Left placement.</p>
          </Drawer.Body>
        </Drawer>
        <Drawer isOpen={open === 'right'} onClose={() => setOpen(null)} placement="right" title="Right drawer" size="sm">
          <Drawer.Body>
            <p style={{ margin: 0, fontSize: 14, color: '#6b7694' }}>Right placement.</p>
          </Drawer.Body>
        </Drawer>
      </>
    );
  },
};

// ── Placements ────────────────────────────────────────────────────────────────

export const Placements: Story = {
  render: () => {
    const [open, setOpen] = useState<string | null>(null);
    const placements = ['right', 'left', 'top', 'bottom'] as const;
    return (
      <>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {placements.map((p) => (
            <Button key={p} variant="secondary" size="sm" onClick={() => setOpen(p)}>
              {p}
            </Button>
          ))}
        </div>
        {placements.map((p) => (
          <Drawer
            key={p}
            isOpen={open === p}
            onClose={() => setOpen(null)}
            placement={p}
            title={`Drawer — ${p}`}
            size="sm"
          >
            <Drawer.Body>
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7694' }}>
                Sliding in from the <strong>{p}</strong>.
              </p>
            </Drawer.Body>
          </Drawer>
        ))}
      </>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => {
    const [open, setOpen] = useState<string | null>(null);
    const sizes = ['sm', 'md', 'lg', 'full'] as const;
    return (
      <>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {sizes.map((s) => (
            <Button key={s} variant="secondary" size="sm" onClick={() => setOpen(s)}>
              {s}
            </Button>
          ))}
        </div>
        {sizes.map((s) => (
          <Drawer
            key={s}
            isOpen={open === s}
            onClose={() => setOpen(null)}
            placement="right"
            size={s}
            title={`Size: ${s}`}
          >
            <Drawer.Body>
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7694' }}>
                Width: {s === 'sm' ? '320px' : s === 'md' ? '480px' : s === 'lg' ? '640px' : '100vw'}.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button size="sm" onClick={() => setOpen(null)}>Close</Button>
            </Drawer.Footer>
          </Drawer>
        ))}
      </>
    );
  },
};

// ── WithForm ──────────────────────────────────────────────────────────────────

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    return (
      <>
        <Button leftIcon={<Settings size={16} />} onClick={() => setIsOpen(true)}>
          Edit profile
        </Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit profile" size="md">
          <Drawer.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid #F0F2F5' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#E8EEFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={28} color="#2952CC" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#111827' }}>Victor Aldana</p>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#9BA5BE' }}>victor@example.com</p>
                </div>
              </div>

              <TextInput
                label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
              <Select
                label="Role"
                value={role}
                onChange={setRole}
                placeholder="Select a role"
                options={[
                  { value: 'designer', label: 'Designer' },
                  { value: 'engineer', label: 'Engineer' },
                  { value: 'pm', label: 'Product Manager' },
                  { value: 'lead', label: 'Tech Lead' },
                ]}
              />
              <TextInput label="Company" placeholder="Your company" />
              <TextInput label="Website" placeholder="https://yoursite.com" />
            </div>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>Save changes</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer isOpen={open} onClose={() => setOpen(false)} title="Interactive" size="md">
          <Drawer.Body>
            <p style={{ margin: 0, fontSize: 14, color: '#6b7694' }}>Close via overlay, Esc, or footer actions.</p>
          </Drawer.Body>
          <Drawer.Footer>
            <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

// ── DarkMode ──────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <ThemeProvider defaultColorMode="dark">
        <div style={{ padding: '32px', backgroundColor: darkTheme.colors['color-bg-canvas'], borderRadius: '12px' }}>
          <Button leftIcon={<Bell size={16} />} onClick={() => setIsOpen(true)}>
            Open drawer (dark)
          </Button>
          <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Notifications" size="sm">
            <Drawer.Body>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['New comment on your post', 'Version 2.0 released', 'Your export is ready'].map((msg) => (
                  <div key={msg} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #2E3550' }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#F0F2F5' }}>{msg}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#6B7694' }}>Just now</p>
                  </div>
                ))}
              </div>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Mark all read</Button>
            </Drawer.Footer>
          </Drawer>
        </div>
      </ThemeProvider>
    );
  },
};
