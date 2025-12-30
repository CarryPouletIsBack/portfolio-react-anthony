import React from "react";
import { motion } from "framer-motion";
import type { FlowNodeData } from "../../data/flowData";
import { cn } from "../../lib/utils";

interface TreeNodeProps {
  data: FlowNodeData;
  depth?: number;
  selectedNodes?: Set<string>;
  onNodeClick?: (nodeId: string, event?: React.MouseEvent) => void;
}

const LINE_COLOR = "bg-zinc-700";
const LINE_COLOR_ACTIVE = "bg-[#f1582a]";
const TEXT_COLOR = "text-zinc-100";
const TEXT_COLOR_DISABLED = "text-zinc-500";
const NODE_BG = "bg-black";
const NODE_BG_DISABLED = "bg-zinc-900/50";
const NODE_BORDER = "border-zinc-800";
const NODE_BORDER_DISABLED = "border-zinc-700/50";
const NODE_BORDER_ACTIVE = "border-[#f1582a]";
const NODE_BG_ACTIVE = "bg-[#f1582a]/20";

export const TreeNode: React.FC<TreeNodeProps> = ({
  data,
  depth = 0,
  selectedNodes = new Set(),
  onNodeClick,
}) => {
  const hasBranches = data.branches && data.branches.length > 0;
  const hasNext = !!data.next;
  const isSelected = selectedNodes.has(data.id);
  const isDisabled = data.disabled === true;
  
  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) return; // Ne pas permettre le clic si désactivé
    if (onNodeClick) {
      onNodeClick(data.id, e);
    }
  };

  return (
    <div className="flex flex-row items-center">
      {/* The Node Itself */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: depth * 0.1 }}
        onClick={handleClick}
        className={cn(
          "relative z-10 whitespace-nowrap rounded-full border px-6 py-2.5 text-sm font-medium transition-colors",
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-zinc-500 hover:bg-zinc-900",
          isDisabled ? NODE_BG_DISABLED : NODE_BG,
          isDisabled ? NODE_BORDER_DISABLED : (isSelected ? NODE_BORDER_ACTIVE : NODE_BORDER),
          isDisabled ? "" : (isSelected ? NODE_BG_ACTIVE : ""),
          isDisabled ? TEXT_COLOR_DISABLED : TEXT_COLOR
        )}
      >
        {data.label}
      </motion.div>

      {/* Horizontal Flow (Next) */}
      {hasNext && (
        <div className="flex flex-row items-center">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.4, delay: depth * 0.1 }}
            className={cn(
              "h-[2px]", 
              (isSelected || selectedNodes.has(data.next!.id)) ? LINE_COLOR_ACTIVE : LINE_COLOR
            )} 
          />
          <TreeNode 
            data={data.next!} 
            depth={depth + 1}
            selectedNodes={selectedNodes}
            onNodeClick={onNodeClick}
          />
        </div>
      )}

      {/* Vertical Branches */}
      {hasBranches && (
        <div className="flex flex-row items-center">
          {/* Connector from Parent to Spine */}
          <motion.div 
             initial={{ width: 0 }}
             animate={{ width: 48 }}
             transition={{ duration: 0.4, delay: depth * 0.1 }}
             className={cn(
               "h-[2px]", 
               isSelected ? LINE_COLOR_ACTIVE : LINE_COLOR
             )} 
          />
          
          {/* The Spine and Children List */}
          <div className="flex flex-col">
            {data.branches!.map((branch, index) => {
              const isFirstChild = index === 0;
              const isLastChild = index === data.branches!.length - 1;
              const isOnlyChild = data.branches!.length === 1;
              const branchIsSelected = selectedNodes.has(branch.id);
              const shouldHighlightBranch = isSelected || branchIsSelected;

              return (
                <div key={branch.id} className="relative flex flex-row">
                  {/* Spine Segment Container */}
                  <div className="relative w-0 shrink-0">
                     {!isOnlyChild && (
                       <>
                         {/* Top Half (Connects from top to center) */}
                         {!isFirstChild && (
                           <div className={cn(
                             "absolute -top-[2px] left-0 h-[50%] w-[2px]", 
                             shouldHighlightBranch ? LINE_COLOR_ACTIVE : LINE_COLOR
                           )} />
                         )}
                         {/* Bottom Half (Connects from center to bottom) */}
                         {!isLastChild && (
                           <div className={cn(
                             "absolute top-[50%] left-0 h-[50%] w-[2px]", 
                             shouldHighlightBranch ? LINE_COLOR_ACTIVE : LINE_COLOR
                           )} />
                         )}
                       </>
                     )}
                  </div>

                  {/* Horizontal Connector to Child */}
                  <div className="flex flex-col justify-center">
                     <div className={cn(
                       "h-[2px] w-12", 
                       shouldHighlightBranch ? LINE_COLOR_ACTIVE : LINE_COLOR
                     )} />
                  </div>

                  {/* Child Content Wrapper */}
                  <div className="py-3 flex items-center">
                    <TreeNode
                      data={branch}
                      depth={depth + 1}
                      selectedNodes={selectedNodes}
                      onNodeClick={onNodeClick}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

