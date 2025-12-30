import './AboutNew.css'
import { useState } from 'react'
import { TreeNode } from './flow/FlowTree'
import { flowData } from '../data/flowData'
import type { FlowNodeData } from '../data/flowData'

const AboutNew = () => {
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set())
  const [selectedNodeData, setSelectedNodeData] = useState<FlowNodeData | null>(null)
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null)

  // Trouver le nœud dans les données
  const findNode = (data: FlowNodeData, id: string): FlowNodeData | null => {
    if (data.id === id) return data
    if (data.branches) {
      for (const branch of data.branches) {
        const found = findNode(branch, id)
        if (found) return found
      }
    }
    if (data.next) {
      const found = findNode(data.next, id)
      if (found) return found
    }
    return null
  }

  // Trouver tous les ascendants (parents) d'un nœud
  const findAncestors = (data: FlowNodeData, targetId: string, path: string[] = []): string[] | null => {
    // Si on a trouvé le nœud cible, retourner le chemin
    if (data.id === targetId) {
      return path
    }

    // Chercher dans les branches
    if (data.branches) {
      for (const branch of data.branches) {
        const result = findAncestors(branch, targetId, [...path, data.id])
        if (result) return result
      }
    }

    // Chercher dans next
    if (data.next) {
      const result = findAncestors(data.next, targetId, [...path, data.id])
      if (result) return result
    }

    return null
  }

  const handleNodeClick = (nodeId: string, event?: React.MouseEvent) => {
    const node = findNode(flowData, nodeId)
    
    if (node) {
      if (selectedNodeData?.id === nodeId) {
        // Si on clique sur le même nœud, fermer la popup
        setSelectedNodeData(null)
        setPopupPosition(null)
        setSelectedNodes(new Set())
      } else {
        // Sinon, ouvrir la popup et désélectionner tous les autres nœuds
        if (event) {
          const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
          const containerRect = document.querySelector('.skill-tree-container')?.getBoundingClientRect()
          
          if (containerRect) {
            // Positionner la popup à droite du nœud avec un petit offset
            setPopupPosition({
              x: rect.right - containerRect.left + 16,
              y: rect.top - containerRect.top + (rect.height / 2)
            })
          }
        }
        setSelectedNodeData(node)
        
        // Trouver tous les ascendants du nœud sélectionné
        const ancestors = findAncestors(flowData, nodeId)
        const nodesToSelect = ancestors ? [...ancestors, nodeId] : [nodeId]
        
        // Remplacer complètement le Set avec le nœud et tous ses ascendants
        setSelectedNodes(new Set(nodesToSelect))
      }
    }
  }

  const closePopup = () => {
    setSelectedNodeData(null)
    setPopupPosition(null)
  }

  return (
    <div className="page active apropos-new-page">
      <div className="main-apropos-new">
        <div className="skill-tree-wrapper">
          <div className="skill-tree-header">
            <div className="skill-tree-header-left">
              <span>(C)</span>
              <span>theme</span>
            </div>
            <div className="skill-tree-header-right">about</div>
          </div>

          <div className="skill-tree-content">
            <div className="skill-tree-title-text">Arbre de compétences</div>
            <div className="skill-tree-description">
              Arbre de compétences Product Designer structuré en racines, tronc, branches, feuilles, bourgeons et cime.
            </div>
          </div>

          {/* The Tree Diagram */}
          <div className="skill-tree-container">
            <TreeNode 
              data={flowData} 
              selectedNodes={selectedNodes}
              onNodeClick={handleNodeClick}
            />
            
            {/* Popup Tooltip */}
            {selectedNodeData && popupPosition && (
              <div 
                className="node-popup-tooltip"
                style={{
                  left: `${popupPosition.x}px`,
                  top: `${popupPosition.y}px`,
                  transform: 'translateY(-50%)'
                }}
              >
                <button className="node-popup-close" onClick={closePopup}>×</button>
                <h3 className="node-popup-title">{selectedNodeData.label}</h3>
                {selectedNodeData.description && (
                  <p className="node-popup-description">{selectedNodeData.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutNew
