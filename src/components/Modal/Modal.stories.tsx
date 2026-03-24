import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Trash2, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { TextInput } from '../TextInput';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { darkTheme } from '../../theme/theme';
import type { ModalSize } from './Modal.types';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A portal-based dialog with focus trap, body scroll lock, ESC-to-close, and overlay-click-to-close. Compose with Modal.Header, Modal.Body, and Modal.Footer.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'fullscreen'],
    },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    title: { control: 'text' },
    isOpen: { control: false },
    onClose: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ── Shared trigger helper ─────────────────────────────────────────────────────

function ModalDemo({
  label = 'Open modal',
  children,
}: {
  label?: string;
  children: (open: boolean, close: () => void) => React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{label}</Button>
      {children(isOpen, () => setIsOpen(false))}
    </>
  );
}

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEsc: true,
  },
  render: (args) => (
    <ModalDemo label="Open modal">
      {(isOpen, close) => (
        <Modal {...args} isOpen={isOpen} onClose={close}>
          <Modal.Header title="Confirm action" subtitle="Review the details before continuing" onClose={close} />
          <Modal.Body>
            <p style={{ margin: 0 }}>
              This is the modal body. Use the size control in the toolbar to preview different
              widths. Click the overlay or press ESC to dismiss.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" size="sm" onClick={close}>Cancel</Button>
            <Button size="sm" onClick={close}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      )}
    </ModalDemo>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

const SIZES: ModalSize[] = ['sm', 'md', 'lg', 'xl', 'fullscreen'];

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {SIZES.map((size) => (
        <ModalDemo key={size} label={`size="${size}"`}>
          {(isOpen, close) => (
            <Modal isOpen={isOpen} onClose={close} size={size}>
              <Modal.Header title={`size="${size}"`} subtitle="Max-width varies by size" onClose={close} />
              <Modal.Body>
                <p style={{ margin: 0 }}>
                  {size === 'sm' && 'Small modals (400px) are great for simple confirmations.'}
                  {size === 'md' && 'Medium (560px) is the default — balanced for most content.'}
                  {size === 'lg' && 'Large (720px) suits forms with multiple fields or rich content.'}
                  {size === 'xl' && 'Extra-large (900px) for data-heavy or wide layouts.'}
                  {size === 'fullscreen' && 'Fullscreen covers the entire viewport with no border-radius.'}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button size="sm" onClick={close}>Close</Button>
              </Modal.Footer>
            </Modal>
          )}
        </ModalDemo>
      ))}
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <ModalDemo label="With subtitle">
        {(isOpen, close) => (
          <Modal isOpen={isOpen} onClose={close} size="md">
            <Modal.Header title="Edit settings" subtitle="Changes apply immediately." onClose={close} />
            <Modal.Body>
              <p style={{ margin: 0, fontSize: 14, color: '#6b7694' }}>Body content.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="ghost" onClick={close}>
                Cancel
              </Button>
              <Button size="sm" onClick={close}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </ModalDemo>
      <ModalDemo label="Title only">
        {(isOpen, close) => (
          <Modal isOpen={isOpen} onClose={close} size="sm">
            <Modal.Header title="Quick confirm" onClose={close} />
            <Modal.Body>
              <p style={{ margin: 0, fontSize: 14, color: '#6b7694' }}>Short message.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" onClick={close}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </ModalDemo>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <ModalDemo label="Default">
        {(isOpen, close) => (
          <Modal isOpen={isOpen} onClose={close} size="sm">
            <Modal.Header title="Notice" onClose={close} />
            <Modal.Body>
              <p style={{ margin: 0 }}>Standard dialog.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" onClick={close}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </ModalDemo>
      <ModalDemo label="Danger">
        {(isOpen, close) => (
          <Modal isOpen={isOpen} onClose={close} size="sm">
            <Modal.Header title="Remove item" onClose={close} />
            <Modal.Body>
              <p style={{ margin: 0 }}>This cannot be undone.</p>
            </Modal.Body>
            <Modal.Footer align="space-between">
              <Button variant="ghost" size="sm" onClick={close}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" leftIcon={<Trash2 size={14} />} onClick={close}>
                Remove
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </ModalDemo>
    </div>
  ),
};

// ── With Form ─────────────────────────────────────────────────────────────────

export const WithForm: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>

      <ModalDemo label="Invite member">
        {(isOpen, close) => (
          <Modal isOpen={isOpen} onClose={close} size="md">
            <Modal.Header
              title="Invite team member"
              subtitle="They will receive an email invitation."
              onClose={close}
            />
            <Modal.Body>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TextInput
                  label="Full name"
                  placeholder="Jane Smith"
                  isRequired
                />
                <TextInput
                  label="Email address"
                  placeholder="jane@example.com"
                  isRequired
                />
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    Role
                  </label>
                  <select style={{
                    width: '100%', height: '40px', padding: '0 12px',
                    border: '1px solid #D8DCE5', borderRadius: '8px',
                    fontSize: '14px', fontFamily: 'inherit', background: 'white',
                  }}>
                    <option>Viewer</option>
                    <option>Editor</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer align="space-between">
              <Button variant="ghost" size="sm" onClick={close}>Cancel</Button>
              <Button size="sm" onClick={close}>Send invitation</Button>
            </Modal.Footer>
          </Modal>
        )}
      </ModalDemo>

      <ModalDemo label="Delete account">
        {(isOpen, close) => (
          <Modal isOpen={isOpen} onClose={close} size="sm">
            <Modal.Header title="Delete account" onClose={close} />
            <Modal.Body>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '40px', height: '40px', flexShrink: 0, borderRadius: '50%',
                  background: '#FCEAEC', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <AlertTriangle size={20} color="#D22232" />
                </div>
                <div>
                  <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: '14px', color: '#0C0D10' }}>
                    This action cannot be undone
                  </p>
                  <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#4E5A6E', lineHeight: 1.6 }}>
                    All your data, projects, and settings will be permanently deleted.
                    Type your email to confirm.
                  </p>
                  <TextInput placeholder="your@email.com" hasError />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" size="sm" onClick={close}>Cancel</Button>
              <Button variant="danger" size="sm" leftIcon={<Trash2 size={14} />} onClick={close}>
                Delete account
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </ModalDemo>

    </div>
  ),
};

// ── Nested Content ─────────────────────────────────────────────────────────────

export const NestedContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>

      <ModalDemo label="Scrollable body">
        {(isOpen, close) => (
          <Modal isOpen={isOpen} onClose={close} size="md">
            <Modal.Header
              title="Terms of Service"
              subtitle="Please read carefully before continuing"
              onClose={close}
            />
            <Modal.Body isScrollable>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: '14px', color: '#0C0D10' }}>
                    Section {i + 1}: {['Acceptance', 'Privacy', 'Data Use', 'Termination', 'Liability', 'Governing Law', 'Changes', 'Contact'][i]}
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#4E5A6E', lineHeight: 1.6 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer align="space-between">
              <Button variant="ghost" size="sm" onClick={close}>Decline</Button>
              <Button size="sm" leftIcon={<CheckCircle size={14} />} onClick={close}>Accept & continue</Button>
            </Modal.Footer>
          </Modal>
        )}
      </ModalDemo>

      <ModalDemo label="With rich content">
        {(isOpen, close) => (
          <Modal isOpen={isOpen} onClose={close} size="lg">
            <Modal.Header
              title="Release notes — v2.4.0"
              subtitle="March 22, 2026"
              onClose={close}
            />
            <Modal.Body>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Badge variant="success">New features</Badge>
                  </div>
                  <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: '#4E5A6E', lineHeight: 2 }}>
                    <li>Card component with compound sub-components</li>
                    <li>Modal with focus trap and body scroll lock</li>
                    <li>TextInput with prefix/suffix and status icons</li>
                  </ul>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Badge variant="warning">Breaking changes</Badge>
                  </div>
                  <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: '#4E5A6E', lineHeight: 2 }}>
                    <li>Button <code>loading</code> prop renamed to <code>isLoading</code></li>
                    <li>Badge <code>colour</code> prop replaced by <code>variant</code></li>
                  </ul>
                </div>
                <div style={{ display: 'flex', gap: '10px', padding: '14px', background: '#E6EEFF', borderRadius: '8px' }}>
                  <Info size={16} color="#0055FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ margin: 0, fontSize: '13px', color: '#003399', lineHeight: 1.6 }}>
                    Run <code>npm install @design-system/core@latest</code> and check the migration
                    guide for full details.
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" size="sm" onClick={close}>Dismiss</Button>
              <Button size="sm" onClick={close}>View changelog</Button>
            </Modal.Footer>
          </Modal>
        )}
      </ModalDemo>

      <ModalDemo label="No dividers">
        {(isOpen, close) => (
          <Modal isOpen={isOpen} onClose={close} size="sm">
            <Modal.Header title="Quick note" onClose={close} hasDivider={false} />
            <Modal.Body>
              <p style={{ margin: 0 }}>
                This modal omits the divider lines between header, body, and footer for a cleaner
                look — suitable for short, non-critical messages.
              </p>
            </Modal.Body>
            <Modal.Footer hasDivider={false}>
              <Button size="sm" onClick={close}>Got it</Button>
            </Modal.Footer>
          </Modal>
        )}
      </ModalDemo>

    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider defaultColorMode="dark">
      <div
        style={{
          padding: '32px',
          backgroundColor: darkTheme.colors['color-bg-canvas'],
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          borderRadius: '12px',
        }}
      >
        <ModalDemo label="Default modal">
          {(isOpen, close) => (
            <Modal isOpen={isOpen} onClose={close} size="md">
              <Modal.Header
                title="Dark mode modal"
                subtitle="All tokens resolve to their dark variants"
                onClose={close}
              />
              <Modal.Body>
                <p style={{ margin: '0 0 16px' }}>
                  The overlay, panel, border, and text colors all adapt to the active theme
                  without any additional configuration.
                </p>
                <TextInput label="Email" placeholder="you@example.com" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="ghost" size="sm" onClick={close}>Cancel</Button>
                <Button size="sm" onClick={close}>Save</Button>
              </Modal.Footer>
            </Modal>
          )}
        </ModalDemo>

        <ModalDemo label="Danger modal">
          {(isOpen, close) => (
            <Modal isOpen={isOpen} onClose={close} size="sm">
              <Modal.Header title="Delete project" onClose={close} />
              <Modal.Body>
                <p style={{ margin: 0 }}>
                  This will permanently delete the project and all its data. This action cannot be
                  reversed.
                </p>
              </Modal.Body>
              <Modal.Footer align="space-between">
                <Button variant="ghost" size="sm" onClick={close}>Cancel</Button>
                <Button variant="danger" size="sm" leftIcon={<Trash2 size={14} />} onClick={close}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </ModalDemo>
      </div>
    </ThemeProvider>
  ),
};
